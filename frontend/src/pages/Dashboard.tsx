import { Grid, Paper, Typography } from '@mui/material';
import PageTitle from '../components/PageTitle';

export default function Dashboard() {
  return (
    <>
      <PageTitle title="Overview" subtitle="Quick stats & entry points" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Airports</Typography>
            <Typography variant="h4">Browse by Country</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Airlines</Typography>
            <Typography variant="h4">Codeshare & Stops</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">Trips</Typography>
            <Typography variant="h4">Shortest & Constrained</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
