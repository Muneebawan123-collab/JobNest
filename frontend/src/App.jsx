import JobDetails from './pages/jobs/JobDetails';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './features/auth/authSlice';
import './index.css';
import JobSeekerProfile from './pages/profile/JobSeekerProfile';
import EmployerProfile from './pages/profile/EmployerProfile';
import ErrorBoundary from './components/ErrorBoundary';
import JobsList from './pages/jobs/JobsList';
import PostJob from './pages/jobs/PostJob';
import UserApplications from './pages/applications/UserApplications';
import EmployerApplications from './pages/applications/EmployerApplications';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <ErrorBoundary>
      <>
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/">JobNest</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link> {/* ✅ Added Jobs link */}
                {!token && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
                {!token && <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>}
                {token && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
              </Nav>
              {token && (
                <Nav>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/profile/jobseeker" element={<JobSeekerProfile />} />
            <Route path="/profile/employer" element={<EmployerProfile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/jobs" element={<JobsList />} />
            <Route path="/jobs/new" element={<PostJob />} />
            <Route path="/applications" element={<UserApplications />} />
            <Route path="/employer/applications" element={<EmployerApplications />} />
          </Routes>
        </Container>
      </>
    </ErrorBoundary>
  );
}

export default App;
