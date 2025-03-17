import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { loginUser } from '../features/auth/authSlice';

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const { token, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(loginUser()); // Re-validate token
    }
  }, [dispatch, token, user]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;