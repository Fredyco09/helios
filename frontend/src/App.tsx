import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Airports from './pages/Airports';
import Airlines from './pages/Airlines';
import Trips from './pages/Trips';

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/airports" element={<Airports />} />
        <Route path="/airlines" element={<Airlines />} />
        <Route path="/trips" element={<Trips />} />
      </Routes>
    </DashboardLayout>
  );
}
