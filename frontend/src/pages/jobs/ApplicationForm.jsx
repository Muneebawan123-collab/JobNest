import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const ApplicationForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    resume: '',
    coverLetter: ''
  });
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.applications);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add application submission logic
  };

  return (
    <div className="mt-5 border-top pt-4">
      <h4>Apply for this Position</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Resume URL *</Form.Label>
          <Form.Control
            type="url"
            value={formData.resume}
            onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
            placeholder="Paste your resume link (Google Drive, Dropbox, etc.)"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cover Letter</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={formData.coverLetter}
            onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
            placeholder="Explain why you're a good fit..."
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </Form>
    </div>
  );
};

export default ApplicationForm;