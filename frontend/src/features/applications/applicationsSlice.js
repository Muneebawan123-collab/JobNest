import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMyApplications = createAsyncThunk(
  'applications/fetchMyApplications',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get('/api/applications/my-applications', {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  }
);

export const fetchEmployerApplications = createAsyncThunk(
  'applications/fetchEmployerApplications',
  async (_, { getState }) => {
    const { auth } = getState();
    const response = await axios.get('/api/applications/employer', {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'applications/updateStatus',
  async ({ id, status }, { getState }) => {
    const { auth } = getState();
    const response = await axios.patch(`/api/applications/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data;
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState: {
    myApplications: [],
    employerApplications: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.myApplications = action.payload;
      })
      .addCase(fetchMyApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployerApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.employerApplications = action.payload;
      })
      .addCase(fetchEmployerApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const index = state.employerApplications.findIndex(
          app => app._id === action.payload._id
        );
        if (index !== -1) {
          state.employerApplications[index] = action.payload;
        }
      });
  }
});

export default applicationsSlice.reducer;