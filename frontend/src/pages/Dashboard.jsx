import { Container, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/'); // Add this line
  };

  return (
    <Container className="mt-5">
      <h2>Welcome {user?.email}</h2>
      <Alert variant="info">
        {user?.role === 'jobSeeker' 
          ? "Job Seeker Dashboard" 
          : "Employer Dashboard"}
      </Alert>
      {/* Add dashboard content based on role */}
    </Container>
  );
};

export default Dashboard;