import { useState } from 'react';
import { Paper, Stack, TextField, Button, Chip, Typography } from '@mui/material';
import PageTitle from '../components/PageTitle';
import { getShortestTrip, getConstrainedTrip } from '../lib/api';

export default function Trips() {
  const [src, setSrc] = useState('SEA');
  const [dst, setDst] = useState('JFK');
  const [maxHops, setMaxHops] = useState(8);
  const [zStops, setZStops] = useState(1);
  const [path, setPath] = useState<string[]>([]);

  const loadShortest = async () => setPath((await getShortestTrip(src, dst, maxHops)).path || []);
  const loadConstrained = async () => setPath((await getConstrainedTrip(src, dst, zStops, maxHops)).path || []);

  return (
    <>
      <PageTitle title="Trip Planner" subtitle="Shortest and constrained reachability" />
      <Paper sx={{ p:2, mb:2 }}>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <TextField label="From (IATA)" size="small" value={src} onChange={e => setSrc(e.target.value.toUpperCase())}/>
          <TextField label="To (IATA)" size="small" value={dst} onChange={e => setDst(e.target.value.toUpperCase())}/>
          <TextField label="Max Hops" type="number" size="small" value={maxHops} onChange={e => setMaxHops(Number(e.target.value))}/>
          <TextField label="Max Stops per Edge" type="number" size="small" value={zStops} onChange={e => setZStops(Number(e.target.value))}/>
          <Button variant="contained" onClick={loadShortest}>Shortest</Button>
          <Button onClick={loadConstrained}>Constrained</Button>
        </Stack>
      </Paper>

      {path.length > 0 ? (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
          {path.map((code, i) => (
            <Stack key={`${code}-${i}`} direction="row" spacing={1} alignItems="center">
              <Chip label={code} />
              {i < path.length - 1 && <Typography variant="body2">→</Typography>}
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography color="text.secondary">No path found (try lowering constraints or increasing hops).</Typography>
      )}
    </>
  );
}
