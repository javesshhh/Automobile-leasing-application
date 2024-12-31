import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import jwt_decode from 'jwt-decode';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />

          <Route path="/booking/:carid" exact element={<ProtectedRoute><BookingCar /></ProtectedRoute>} />
          <Route path="/userbookings" exact element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
          <Route path="/addcar" exact element={<AdminRoute><AddCar /></AdminRoute>} />
          <Route path="/admin" exact element={<AdminRoute><AdminHome /></AdminRoute>} />
          <Route path="/editcar/:carid" exact element={<AdminRoute><EditCar /></AdminRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) {
    return children;
  } else {
    return <Navigate to='/login' />;
  }
}

export function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwt_decode(token);
    if (decoded.role === 'admin') {
      return children;
    }
  }
  return <Navigate to='/' />;
}