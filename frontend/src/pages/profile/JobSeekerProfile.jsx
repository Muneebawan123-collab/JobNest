import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { getProfile, updateProfile } from '../../features/profile/profileSlice';

const JobSeekerProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    fullName: '',
    skills: [],
    experience: [],
    education: []
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || '',
        skills: profile.skills || [],
        experience: profile.experience || [],
        education: profile.education || []
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Job Seeker Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Skills (comma separated)</Form.Label>
              <Form.Control
                type="text"
                value={formData.skills.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  skills: e.target.value.split(',').map(skill => skill.trim()) 
                })}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Add experience and education fields here */}
          </Col>
        </Row>

        <div className="mt-4">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobSeekerProfile;