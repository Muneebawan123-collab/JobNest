import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
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
              <Button as={Link} to="/signup" variant="primary">
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
              <Button as={Link} to="/signup" variant="success">
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