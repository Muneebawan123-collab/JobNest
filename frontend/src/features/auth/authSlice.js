import { createSlice } from '@reduxjs/toolkit';
import authService from './authService';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  preselectedRole: null,  // ✅ Added preselectedRole to state
};

// Verify the loginUser thunk exists
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.post('/api/auth/login', credentials);
    localStorage.setItem('token', response.data.token);
    dispatch(setCredentials({ 
      user: response.data.result,
      token: response.data.token
    }));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Login failed'));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

// Add this async thunk
export const initializeAuth = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const user = await authService.getProfile(token);
      dispatch(setCredentials({ user, token }));
    } catch (error) {
      localStorage.removeItem('token');
    }
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const data = await authService.signup(userData);
    localStorage.setItem('token', data.token);
    dispatch(setCredentials({ user: data.result, token: data.token }));
    return true;
  } catch (error) {
    dispatch(setError(error.response?.data?.message || 'Signup failed'));
    return false;
  } finally {
    dispatch(setLoading(false));
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');  // Ensures token is removed on logout
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPreselectedRole: (state, action) => {
      state.preselectedRole = action.payload; // ✅ Added new reducer to handle preselectedRole
    }
  },
});

export const { setCredentials, logout, setLoading, setError, clearError, setPreselectedRole } = authSlice.actions;
export default authSlice.reducer;
