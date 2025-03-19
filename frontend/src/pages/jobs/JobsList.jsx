import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Spinner, Alert } from 'react-bootstrap';
import { fetchJobs } from '../../features/jobs/jobsSlice';
import { Link } from 'react-router-dom';

const JobsList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );

  if (error) return (
    <Alert variant="danger" className="mt-5">
      Error loading jobs: {error}
    </Alert>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h2>Latest Job Opportunities</h2>
        {user?.role === 'employer' && (
          <Button as={Link} to="/jobs/new" variant="success">
            Post New Job
          </Button>
        )}
      </div>

      <div className="row g-4">
        {jobs.map((job) => (
          <div className="col-md-6 col-lg-4" key={job._id}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {job.employer?.companyName || 'Unknown Company'}
                </Card.Subtitle>
                <Card.Text className="text-truncate">
                  {job.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-primary">{job.employmentType}</span>
                  <Button 
                    as={Link} 
                    to={`/jobs/${job._id}`} 
                    variant="outline-primary"
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
              <Card.Footer className="text-muted">
                {new Date(job.createdAt).toLocaleDateString()}
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsList;