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
            Welcome, {user?.email}
          </Card.Title>
          
          {user?.role === 'jobSeeker' ? (
            <>
              <Card.Text>
                {profile?.skills?.length > 0 ? (
                  `Your skills: ${profile.skills.join(', ')}`
                ) : (
                  <Alert variant="warning">Complete your profile to get noticed by employers!</Alert>
                )}
              </Card.Text>
              <Button as={Link} to="/profile/jobseeker" variant="primary">
                {profile ? 'Edit Profile' : 'Create Profile'}
              </Button>
            </>
          ) : (
            <>
              <Card.Text>
                {profile?.companyName ? (
                  `Company: ${profile.companyName}`
                ) : (
                  <Alert variant="warning">Set up your company profile to post jobs!</Alert>
                )}
              </Card.Text>
              <Button as={Link} to="/profile/employer" variant="primary" className="me-2">
                {profile ? 'Edit Company Profile' : 'Create Company Profile'}
              </Button>
              <Button as={Link} to="/jobs/new" variant="success">
                Post New Job
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Dashboard;