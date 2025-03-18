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
    if (token && !profile) {
      dispatch(getProfile()); // Correct action call
    }
  }, [dispatch, token, profile]);

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