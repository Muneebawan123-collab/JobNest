import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleSignupNavigation = (role) => {
    navigate('/signup', { 
      state: { preselectedRole: role },
      replace: true
    });
  };

  return (
    <div className="mt-5 text-center">
      <h1 className="display-4 mb-4">Welcome to JobNest</h1>
      <p className="lead">Find your dream job or perfect candidate</p>
      
      <Row className="mt-5">
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Job Seeker</Card.Title>
              <Card.Text>
                Find your next career opportunity
              </Card.Text>
              <Button 
                variant="primary"
                onClick={() => handleSignupNavigation('jobSeeker')}
              >
                Register as Job Seeker
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>Employer</Card.Title>
              <Card.Text>
                Post jobs and find talent
              </Card.Text>
              <Button 
                variant="success"
                onClick={() => handleSignupNavigation('employer')}
              >
                Register as Employer
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
