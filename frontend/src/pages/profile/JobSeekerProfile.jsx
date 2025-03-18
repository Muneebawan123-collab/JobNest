import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { getProfile, updateProfile } from '../../features/profile/profileSlice';
import { clearProfileError } from '../../features/profile/profileSlice';

const JobSeekerProfile = () => {
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector((state) => state.profile);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(clearProfileError()); // Clear previous errors
      dispatch(updateProfile(formData));
    };
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4">Job Seeker Profile</h2>
        
        {error && (
          <Alert variant="danger" className="mb-4">
            Profile update failed: {error}
            <Button 
              variant="link" 
              onClick={() => dispatch(clearProfileError())}
              className="float-end"
            >
              Dismiss
            </Button>
          </Alert>
        )}
  
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Full Name *</Form.Label>
            <Form.Control
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              required
              isInvalid={!!error}
            />
          </Form.Group>
  
          {/* Add other fields */}
  
          <Button 
            variant="primary" 
            type="submit" 
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Profile'}
          </Button>
        </Form>
      </div>
    );
  };

export default JobSeekerProfile;