import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobDetails } from '../../features/jobs/jobsSlice';
import { Card, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import ApplicationForm from './ApplicationForm';

const JobDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentJob: job, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobDetails(id));
  }, [dispatch, id]);

  // Handle loading and error states
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-5">{error}</Alert>;
  
  // Ensure job exists before rendering
  if (!job) return <Alert variant="warning" className="mt-5">Job details not available</Alert>;

  return (
    <div className="container mt-4">
      <Card className="shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Card.Title>{job?.title || "Job Title Not Available"}</Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                {job?.employer?.companyName || "Company Not Available"}
              </Card.Subtitle>
              <Badge bg="primary" className="me-2">{job?.employmentType || "N/A"}</Badge>
              <Badge bg="secondary">{job?.location || "Location Not Available"}</Badge>
            </div>
            <div className="text-end">
              <h4 className="text-success">${job?.salary || "N/A"}/year</h4>
              <small className="text-muted">
                Posted: {job?.createdAt ? new Date(job.createdAt).toLocaleDateString() : "N/A"}
              </small>
            </div>
          </div>

        <div className="mt-4">
            <h5>Description</h5>
            <div className="text-muted" style={{ whiteSpace: 'pre-wrap' }}>
            {job.description}
            </div>
        </div>

         <div className="mt-4">
            <h5>Requirements</h5>
            <ul>
                {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
            ))}
            </ul>
        </div>

          {user?.role === 'jobSeeker' && job?._id && <ApplicationForm jobId={job._id} />}
        </Card.Body>
      </Card>
    </div>
  );
};

export default JobDetails;
