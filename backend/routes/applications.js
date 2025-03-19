import express from 'express';
import auth from '../middleware/auth.js';
import Application from '../models/Application.js';

const router = express.Router();

// Get applications for job seeker
router.get('/my-applications', auth, async (req, res) => {
    try {
      const applications = await Application.find({ applicant: req.user.id })
        .populate('job', 'title employer')
        .populate('job.employer', 'companyName');
      res.json(applications);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  
  // Get applications for employer
  router.get('/employer', auth, async (req, res) => {
    try {
      const applications = await Application.find({ 'job.employer': req.user.id })
        .populate('job', 'title')
        .populate('applicant', 'email');
      res.json(applications);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  
  // Update application status
  router.patch('/:id/status', auth, async (req, res) => {
    try {
      const application = await Application.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
      ).populate('applicant', 'email');
      
      if (!application) return res.status(404).json({ msg: 'Application not found' });
      res.json(application);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  });
  

router.post('/', auth, async (req, res) => {
  try {
    const { jobId, resume, coverLetter } = req.body;
    
    if (!resume) return res.status(400).json({ msg: 'Resume is required' });

    const application = new Application({
      job: jobId,
      applicant: req.user.id,
      resume,
      coverLetter
    });

    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;