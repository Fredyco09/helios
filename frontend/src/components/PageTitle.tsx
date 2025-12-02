import { Typography, Stack } from '@mui/material';

export default function PageTitle({ title, subtitle }:{ title:string; subtitle?:string }) {
  return (
    <Stack spacing={0.5} sx={{ mb: 2 }}>
      <Typography variant="h5" fontWeight={700}>{title}</Typography>
      {subtitle && <Typography variant="body2" color="text.secondary">{subtitle}</Typography>}
    </Stack>
  );
}
