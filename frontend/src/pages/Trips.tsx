import { useState } from 'react';
import { Paper, Stack, TextField, Button, Chip, Typography, Box, Divider } from '@mui/material';
import PageTitle from '../components/PageTitle';
import { getShortestTrip, getConstrainedTrip, getBoundedReachability } from '../lib/api';

export default function Trips() {
  // Shared inputs
  const [src, setSrc] = useState('SEA');
  const [dst, setDst] = useState('JFK');

  // Shortest path / general reachability
  const [maxHops, setMaxHops] = useState(8);
  const [shortestPath, setShortestPath] = useState<string[]>([]);
  const [shortestLoading, setShortestLoading] = useState(false);

  // Constrained (edge stops ≤ Z)
  const [zStops, setZStops] = useState(1);
  const [constrainedPath, setConstrainedPath] = useState<string[]>([]);
  const [constrainedLoading, setConstrainedLoading] = useState(false);

  // Bounded reachability (within d hops of a city)
  const [origin, setOrigin] = useState('SEA');
  const [dHops, setDHops] = useState(3);
  const [reachable, setReachable] = useState<string[]>([]);
  const [boundedLoading, setBoundedLoading] = useState(false);

  const loadShortest = async () => {
    setShortestLoading(true);
    try {
      const res = await getShortestTrip(src.trim().toUpperCase(), dst.trim().toUpperCase(), maxHops);
      setShortestPath(res?.path ?? []);
    } finally {
      setShortestLoading(false);
    }
  };

  const loadConstrained = async () => {
    setConstrainedLoading(true);
    try {
      const res = await getConstrainedTrip(src.trim().toUpperCase(), dst.trim().toUpperCase(), zStops, maxHops);
      setConstrainedPath(res?.path ?? []);
    } finally {
      setConstrainedLoading(false);
    }
  };

  const loadBounded = async () => {
    setBoundedLoading(true);
    try {
      const res = await getBoundedReachability(origin.trim().toUpperCase(), dHops);
      // Expecting JSON: { cities: ["SEA","PDX", ...] }
      setReachable(res?.cities ?? []);
    } finally {
      setBoundedLoading(false);
    }
  };

  const PathChips = ({ path }: { path: string[] }) => (
    path.length > 0 ? (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
        {path.map((code, i) => (
          <Stack key={`${code}-${i}`} direction="row" spacing={1} alignItems="center">
            <Chip label={code} />
            {i < path.length - 1 && <Typography variant="body2">→</Typography>}
          </Stack>
        ))}
      </Stack>
    ) : (
      <Typography color="text.secondary">No path found (try increasing max hops or relaxing constraints).</Typography>
    )
  );

  return (
    <>
      <PageTitle title="Trip Planner" subtitle="Reachability, constrained reachability, and bounded reachability" />

      {/* A) Reachability (Shortest path) */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Reachability: Find a trip from X to Y (Shortest Path)</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <TextField label="From (IATA)" size="small" value={src} onChange={e => setSrc(e.target.value.toUpperCase())}/>
          <TextField label="To (IATA)" size="small" value={dst} onChange={e => setDst(e.target.value.toUpperCase())}/>
          <TextField label="Max Hops" type="number" size="small" value={maxHops} onChange={e => setMaxHops(Number(e.target.value))}/>
          <Button variant="contained" onClick={loadShortest} disabled={shortestLoading}>
            {shortestLoading ? 'Searching…' : 'Find Shortest'}
          </Button>
        </Stack>
        <PathChips path={shortestPath} />
      </Paper>

      {/* B) Constrained reachability (edge stops ≤ Z) */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Constrained: Trip X → Y with ≤ Z stops per edge</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <TextField label="From (IATA)" size="small" value={src} onChange={e => setSrc(e.target.value.toUpperCase())}/>
          <TextField label="To (IATA)" size="small" value={dst} onChange={e => setDst(e.target.value.toUpperCase())}/>
          <TextField label="Max Stops per Edge (Z)" type="number" size="small" value={zStops} onChange={e => setZStops(Number(e.target.value))}/>
          <TextField label="Max Hops" type="number" size="small" value={maxHops} onChange={e => setMaxHops(Number(e.target.value))}/>
          <Button variant="contained" onClick={loadConstrained} disabled={constrainedLoading}>
            {constrainedLoading ? 'Searching…' : 'Find Constrained'}
          </Button>
        </Stack>
        <PathChips path={constrainedPath} />
      </Paper>

      {/* C) Bounded reachability (all cities within d hops of origin) */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>Bounded: All cities reachable within d hops of a city</Typography>
        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <TextField label="Origin (IATA)" size="small" value={origin} onChange={e => setOrigin(e.target.value.toUpperCase())}/>
          <TextField label="d (Max Hops)" type="number" size="small" value={dHops} onChange={e => setDHops(Number(e.target.value))}/>
          <Button variant="contained" onClick={loadBounded} disabled={boundedLoading}>
            {boundedLoading ? 'Computing…' : 'Find Reachable Cities'}
          </Button>
        </Stack>

        {reachable.length > 0 ? (
          <>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {reachable.length} city{reachable.length === 1 ? '' : 'ies'} reachable within {dHops} hop{dHops === 1 ? '' : 's'} from {origin}.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {reachable.map((code) => <Chip key={code} label={code} />)}
            </Box>
          </>
        ) : (
          <Typography color="text.secondary">No cities found (try increasing d).</Typography>
        )}
      </Paper>
    </>
  );
}
