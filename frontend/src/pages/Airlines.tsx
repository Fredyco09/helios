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

type Mode = 'stops' | 'codeshare' | 'activeUS';

export default function Airlines() {
  const [rows, setRows] = useState<any[]>([]);
  const [stops, setStops] = useState(1);
  const [mode, setMode] = useState<Mode>('stops');

  const loadStops = async () => {
    setMode('stops');
    const data = await getAirlinesWithStops(stops);
    setRows(data.map((r: any, i: number) => ({ id: i, ...r })));
  };

  const loadCodeshare = async () => {
    setMode('codeshare');
    const data = await getCodeShareAirlines();
    setRows(data.map((r: any, i: number) => ({ id: i, ...r })));
  };

  const loadActiveUS = async () => {
    setMode('activeUS');
    const data = await getActiveUSAirlines();
    setRows(data.map((r: any, i: number) => ({ id: i, ...r })));
  };

  // initial load
  useEffect(() => { loadStops(); /* eslint-disable-line react-hooks/exhaustive-deps */ }, []);

  // if the user changes the stops number while "With Stops" is active, refresh results
  useEffect(() => {
    if (mode === 'stops') { void loadStops(); }
  }, [stops]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <PageTitle title="Airlines" subtitle="Stops, codeshare, and active carriers" />
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" spacing={2} alignItems="center" useFlexGap flexWrap="wrap">
          <TextField
            label="Stops = "
            type="number"
            size="small"
            value={stops}
            onChange={(e) => setStops(Number(e.target.value))}
            sx={{ width: 120 }}
          />
          <Button
            variant={mode === 'stops' ? 'contained' : 'outlined'}
            onClick={loadStops}
          >
            With Stops
          </Button>
          <Button
            variant={mode === 'codeshare' ? 'contained' : 'outlined'}
            onClick={loadCodeshare}
          >
            Codeshare
          </Button>
          <Button
            variant={mode === 'activeUS' ? 'contained' : 'outlined'}
            onClick={loadActiveUS}
          >
            Active in US
          </Button>
        </Stack>
      </Paper>
      <Box sx={{ height: 600 }}>
        <DataGrid rows={rows} columns={cols} />
      </Box>
    </>
  );
}
