import { useEffect, useState } from 'react';
import { Paper, Stack, TextField, Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import PageTitle from '../components/PageTitle';
import { getAirlinesWithStops, getCodeShareAirlines, getActiveUSAirlines } from '../lib/api';

const cols: GridColDef[] = [
  { field: 'name', headerName: 'Airline', flex: 1, minWidth: 260 },
  { field: 'iata', headerName: 'IATA', width: 100 },
  { field: 'icao', headerName: 'ICAO', width: 120 }
];

export default function Airlines() {
  const [rows, setRows] = useState<any[]>([]);
  const [stops, setStops] = useState(1);

  const loadStops = async () => setRows((await getAirlinesWithStops(stops)).map((r:any,i:number)=>({id:i,...r})));
  const loadCodeshare = async () => setRows((await getCodeShareAirlines()).map((r:any,i:number)=>({id:i,...r})));
  const loadActiveUS = async () => setRows((await getActiveUSAirlines()).map((r:any,i:number)=>({id:i,...r})));

  useEffect(() => { loadStops(); }, []); // default

  return (
    <>
      <PageTitle title="Airlines" subtitle="Stops, codeshare, and active carriers" />
      <Paper sx={{ p:2, mb:2 }}>
        <Stack direction="row" spacing={2}>
          <TextField label="Stops = " type="number" size="small" value={stops} onChange={e => setStops(Number(e.target.value))}/>
          <Button variant="contained" onClick={loadStops}>With Stops</Button>
          <Button onClick={loadCodeshare}>Codeshare</Button>
          <Button onClick={loadActiveUS}>Active in US</Button>
        </Stack>
      </Paper>
      <Box sx={{ height: 600 }}>
        <DataGrid rows={rows} columns={cols} />
      </Box>
    </>
  );
}
