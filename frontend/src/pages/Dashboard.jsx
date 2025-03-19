import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profile);

  return (
    <div className="container mt-4">
      <Card className="dashboard-card">
        <Card.Body>
          <Card.Title className="mb-4">
            {profile?.fullName || user?.email}
          </Card.Title>

          {user?.role === 'jobSeeker' ? (
            <JobSeekerDashboard profile={profile} />
          ) : (
            <EmployerDashboard profile={profile} />
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

const JobSeekerDashboard = ({ profile }) => (
  <>
    {profile ? (
      <>
        <Card.Text>
          <strong>Skills:</strong> {profile.skills?.join(', ') || 'None listed'}
        </Card.Text>
        <Button as={Link} to="/profile/jobseeker" variant="primary" className="me-2">
          Edit Profile
        </Button>
        <Button as={Link} to="/applications" variant="info">
          View My Applications
        </Button> {/* ✅ Added this button */}
      </>
    ) : (
      <Alert variant="warning">
        Complete your profile to get noticed by employers!
        <Button as={Link} to="/profile/jobseeker" variant="success" className="ms-3">
          Create Profile
        </Button>
      </Alert>
    )}
  </>
);

const EmployerDashboard = ({ profile }) => (
  <>
    {profile ? (
      <>
        <Card.Text>
          <strong>Company:</strong> {profile.companyName}
        </Card.Text>
        <Button as={Link} to="/profile/employer" variant="primary" className="me-2">
          Edit Profile
        </Button>
        <Button as={Link} to="/jobs/new" variant="success" className="me-2">
          Post Job
        </Button>
        <Button as={Link} to="/employer/applications" variant="info">
          View Applications
        </Button> {/* ✅ Added this button */}
      </>
    ) : (
      <Alert variant="warning">
        Set up your company profile to post jobs!
        <Button as={Link} to="/profile/employer" variant="success" className="ms-3">
          Create Profile
        </Button>
      </Alert>
    )}
  </>
);

export default Dashboard;
