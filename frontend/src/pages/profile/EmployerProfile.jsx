import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { getProfile } from '../../features/profile/profileSlice';

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2>Job Seeker Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
            type="text" 
            defaultValue={profile?.fullName || ''} 
          />
        </Form.Group>

        {/* Add other fields similarly */}
        
        <Button variant="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </Form>
    </div>
  );
};

export default EmployerProfile;