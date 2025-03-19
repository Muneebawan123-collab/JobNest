import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Define the initial state properly
const initialState = {
  profile: null,
  loading: false,
  error: null
};

// ✅ Define getProfile properly
const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get('/api/profiles/me', {
        headers: { Authorization: `Bearer ${auth.token}` }
      });

      if (response.status === 404) {
        return null; // No profile exists
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile not found');
    }
  }
);

// ✅ Define updateProfile
const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const endpoint = auth.user.role === 'jobSeeker' 
        ? '/api/profiles/jobseeker' 
        : '/api/profiles/employer';

      const response = await axios.post(endpoint, profileData, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Profile update failed');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState, // ✅ Proper initialization
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Fix error handling
      })
      // ✅ Handle updateProfile cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Fix error handling
      });
  }
});

// ✅ Export properly
export default profileSlice.reducer;
export const { clearProfileError } = profileSlice.actions;
export { getProfile, updateProfile };
