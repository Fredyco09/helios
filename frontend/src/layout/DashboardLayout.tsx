import { PropsWithChildren } from 'react';
import { AppBar, Toolbar, Typography, Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { nav } from './NavItems';

const drawerWidth = 240;

export default function DashboardLayout({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar sx={{ gap: 1 }}>
          <img
            src="/logo2.png"              // or /logo.png
            alt="Helios"
            style={{ width: 75, height: 75, display: 'block' }} />
          <Typography variant="h4" component="div" sx={{ fontFamily: 'Roboto', flexGrow: 1 }}>
            Helios
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent"
        sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' } }}>
        <Toolbar />
        <List>
          {nav.map(item => (
            <ListItemButton key={item.path} selected={pathname === item.path} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
