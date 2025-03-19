import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

const ApplicationForm = ({ jobId }) => {
    const [formData, setFormData] = useState({
      resume: null,
      coverLetter: '',
      uploadProgress: 0
    });
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.applications);
  
    const handleFileChange = (e) => {
      setFormData({ ...formData, resume: e.target.files[0] });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { token } = useSelector((state) => state.auth);
      
      const data = new FormData();
      data.append('resume', formData.resume);
      data.append('coverLetter', formData.coverLetter);
      data.append('jobId', jobId);
  
      try {
        const response = await axios.post('/api/applications', data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setFormData(prev => ({ ...prev, uploadProgress: progress }));
          }
        });
        // Handle success
      } catch (error) {
        // Handle error
      }
    };

    return (
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>Upload Resume (PDF only) *</Form.Label>
            <Form.Control
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              required
            />
            {formData.uploadProgress > 0 && (
              <ProgressBar
                now={formData.uploadProgress}
                label={`${formData.uploadProgress}%`}
                className="mt-2"
              />
            )}
          </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </Form>
  );
};

export default ApplicationForm;