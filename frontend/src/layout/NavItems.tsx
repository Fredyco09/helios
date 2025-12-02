import DashboardIcon from '@mui/icons-material/Dashboard';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import RouteIcon from '@mui/icons-material/Route';

export const nav = [
  { label: 'Overview', path: '/', icon: <DashboardIcon /> },
  { label: 'Airports', path: '/airports', icon: <LocalAirportIcon /> },
  { label: 'Airlines', path: '/airlines', icon: <FlightTakeoffIcon /> },
  { label: 'Trips', path: '/trips', icon: <RouteIcon /> }
];
