import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { getProfile } from '../features/profile/profileSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    if (token && !profile) {
      dispatch(getProfile());
    }
  }, [dispatch, token, profile]);

  if (!token) return <Navigate to="/login" replace />;
  if (loading || !profile) return <div className="text-center mt-5">Loading...</div>;

  return <Outlet />;
};

export default ProtectedRoute;