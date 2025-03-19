import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getProfile } from '../features/profile/profileSlice';
import Spinner from 'react-bootstrap/Spinner';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { exp } = jwtDecode(token);
          if (Date.now() >= exp * 1000) {
            localStorage.removeItem('token');
            dispatch(logout());
          }
        }
      } catch (error) {
        console.error('Token check error:', error);
      }
    };
    checkToken();
  }, [dispatch]);

  if (!token) return <Navigate to="/login" replace />;
  
  if (loading) return (
    <div className="text-center mt-5">
      <Spinner animation="border" />
      <p>Loading profile...</p>
    </div>
  );

  return <Outlet />;
};

export default ProtectedRoute;