import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#d2c019ff' },
    background: { default: '#f7f9fc' }
  },
  shape: { borderRadius: 12 }
});

export default theme;
