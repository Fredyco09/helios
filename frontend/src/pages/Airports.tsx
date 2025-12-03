import { useEffect, useState } from 'react';
import { Box, Paper, Stack, TextField, Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';  
import PageTitle from '../components/PageTitle';
import { getAirportsByCountry } from '../lib/api';

const cols: GridColDef[] = [
  { field: 'iata', headerName: 'IATA', width: 100 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 240 },
  { field: 'city', headerName: 'City', width: 160 },
  { field: 'country', headerName: 'Country', width: 160 }
];

export default function Airports() {
  const [country, setCountry] = useState('United States');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [rows, setRows] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const load = async () => {
    const res = await getAirportsByCountry(country, page, pageSize, 'city');
    setRows(res.items.map((r: any, i: number) => ({ id: `${r.iata}-${i}`, ...r })));
    setTotal(res.total);
  };

  useEffect(() => { load(); }, []); 

  return (
    <>
      <PageTitle title="Airports" subtitle="Browse airports by country" />
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2}>
          <TextField label="Country" value={country} onChange={e => setCountry(e.target.value)} size="small" />
          <Button variant="contained" onClick={load}>Search</Button>
        </Stack>
      </Paper>
      <Box sx={{ height: 600 }}>
        <DataGrid
          rows={rows} columns={cols} pagination
          paginationMode="client"
          pageSizeOptions={[10,25,50,100]}
          initialState={{ pagination: { paginationModel: { pageSize, page: page-1 } } }}
          rowHeight={44}
        />
      </Box>
    </>
  );
}
