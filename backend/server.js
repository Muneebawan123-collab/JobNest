import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profiles.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use('/api/jobs', jobRoutes);

app.use('/api/applications', applicationRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

app.use('/api/profiles', profileRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Job Nest API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});