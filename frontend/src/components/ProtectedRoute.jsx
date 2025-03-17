import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { initializeAuth } from '../features/auth/authSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && token) {
      dispatch(initializeAuth());
    }
  }, [dispatch, user, token]);

  if (!token) return <Navigate to="/login" />;
  if (token && !user) return <div>Loading...</div>; // Add loading state

  return <Outlet />;
};

export default ProtectedRoute;