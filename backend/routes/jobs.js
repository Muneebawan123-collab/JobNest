import express from 'express';
import auth from '../middleware/auth.js';
import Job from '../models/Job.js';

const router = express.Router();

// Add these new routes
router.get('/', async (req, res) => {
    try {
      const jobs = await Job.find()
        .populate('employer', '-password')
        .sort({ createdAt: -1 });
      res.json(jobs);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  
  router.get('/employer', auth, async (req, res) => {
    try {
      const jobs = await Job.find({ employer: req.user.id })
        .populate('employer', '-password')
        .sort({ createdAt: -1 });
      res.json(jobs);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const job = await Job.findById(req.params.id)
        .populate('employer', '-password');
        
      if (!job) return res.status(404).json({ msg: 'Job not found' });
      res.json(job);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Job not found' });
      }
      res.status(500).send('Server Error');
    }
  });

  router.post('/', auth, async (req, res) => {
    try {
      const { title, description } = req.body;
      
      if (!title || !description) {
        return res.status(400).json({ message: 'Title and description are required' });
      }
  
      const newJob = new Job({
        employer: req.user.id,
        ...req.body
      });
  
      const job = await newJob.save();
      res.status(201).json(job);
    } catch (err) {
      console.error('Job post error:', err);
      res.status(500).json({ message: 'Server Error' });
    }
  });

export default router;