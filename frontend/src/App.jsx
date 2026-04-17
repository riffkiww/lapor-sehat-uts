import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Reports from './Reports';
import Booking from './Booking';
import Monitoring from './Monitoring';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/monitoring" element={<Monitoring />} />
      </Routes>
    </Router>
  );
}

export default App;