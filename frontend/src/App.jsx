import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './index.css';
// Add these new imports
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import { useEffect } from 'react';
import { initializeAuth } from './features/auth/authSlice';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  };

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/">JobNest</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
  <Nav.Link href="/">Home</Nav.Link>
  {!token && <Nav.Link href="/login">Login</Nav.Link>}
  {!token && <Nav.Link href="/signup">Sign Up</Nav.Link>}
  {token && <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
</Nav>

{token && (
  <Nav>
    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
  </Nav>
)}
          </Navbar.Collapse>
        </Container>
      </Navbar>

    
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  
  {/* Protected routes */}
  <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  </Route>

  {/* Catch-all route */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;