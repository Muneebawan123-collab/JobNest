import { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { postJob } from '../../features/jobs/jobsSlice';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.jobs);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    salary: '',
    employmentType: 'Full-time'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postJob({
      ...formData,
      requirements: formData.requirements.split(',').map(r => r.trim())
    }))
      .unwrap()
      .then(() => navigate('/jobs'))
      .catch((error) => console.error('Posting failed:', error));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Post New Job</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Title *</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Requirements (comma separated)</Form.Label>
          <Form.Control
            type="text"
            value={formData.requirements}
            onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
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
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Employment Type</Form.Label>
          <Form.Select
            value={formData.employmentType}
            onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              {' '}Posting...
            </>
          ) : 'Post Job'}
        </Button>
      </Form>
    </div>
  );
};

export default PostJob;