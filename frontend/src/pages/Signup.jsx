import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { signupUser } from '../features/auth/authSlice';

const Signup = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: location.state?.role || 'jobSeeker'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser(formData));
    if (result.payload?.token) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">Sign Up</Card.Title>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                {/* Form fields */}
                <div className="d-grid gap-2">
                  <Button 
                    variant="success" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;
