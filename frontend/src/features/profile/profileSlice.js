import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Define getProfile properly
// Update getProfile to handle empty profiles
export const getProfile = createAsyncThunk(
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
  async (profileData, { getState }) => {
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
  }
);

const profileSlice = createSlice({
    name: 'profile',
    reducers: {
      clearProfileError: (state) => {
        state.error = null;
      }
    },
  reducers: {},
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      });
  }
});

// ✅ Export getProfile properly
export { updateProfile };
export default profileSlice.reducer;
export const { clearProfileError } = profileSlice.actions;
