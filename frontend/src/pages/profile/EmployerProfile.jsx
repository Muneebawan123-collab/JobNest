import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearProfileError } from '../../features/profile/profileSlice';

const EmployerProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    location: '',
    description: '',
    contactEmail: ''
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        companyName: profile.companyName || '',
        website: profile.website || '',
        location: profile.location || '',
        description: profile.description || '',
        contactEmail: profile.contactEmail || ''
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearProfileError());
    dispatch(updateProfile(formData));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Company Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Company Name *</Form.Label>
          <Form.Control
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Email *</Form.Label>
          <Form.Control
            type="email"
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="url"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Company Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Profile'}
        </Button>
      </Form>
    </div>
  );
};

export default EmployerProfile;