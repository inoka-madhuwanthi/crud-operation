import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Route instead of Routes
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />} /> {/* Use Route instead of Routes */}
        <Route path='/dashboard' element={<Dashboard />} /> {/* Use Route instead of Routes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
