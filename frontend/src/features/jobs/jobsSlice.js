import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await axios.get('/api/jobs');
  return response.data;
});

export const fetchJobDetails = createAsyncThunk(
  'jobs/fetchJobDetails',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Job not found');
    }
  }
);

export const fetchEmployerJobs = createAsyncThunk('jobs/fetchEmployerJobs', async (_, { getState }) => {
  const { auth } = getState();
  const response = await axios.get('/api/jobs/employer', {
    headers: { Authorization: `Bearer ${auth.token}` }
  });
  return response.data;
});

export const postJob = createAsyncThunk(
  'jobs/postJob',
  async (jobData, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Directly get from localStorage
      const response = await axios.post('/api/jobs', jobData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Job posting failed');
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    employerJobs: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEmployerJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.employerJobs = action.payload;
      })
      .addCase(fetchEmployerJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.loading = false;
        state.employerJobs.unshift(action.payload);
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default jobsSlice.reducer;