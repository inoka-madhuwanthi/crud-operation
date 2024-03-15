// App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Category from './components/Category';
import Users from './components/users';
import Addcategory from './components/Addcategory';
import Adduser from './components/Adduser';
import Edituser from './components/Edituser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path='' element={<Home />} />
          <Route path='users' element={<Users />} />
          <Route path='category' element={<Category />} />
          <Route path='addcategory' element={<Addcategory />} />
          <Route path='adduser' element={<Adduser />} />
          <Route path='/dashboard/edituser/:id' element={<Edituser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
