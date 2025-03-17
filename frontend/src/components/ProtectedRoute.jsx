import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { initializeAuth } from '../features/auth/authSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(initializeAuth());
    }
  }, [dispatch, token, user]);

  if (!token) return <Navigate to="/login" replace />;
  if (!user) return <div>Loading...</div>; // Add loading spinner

  return <Outlet />;
};

export default ProtectedRoute;