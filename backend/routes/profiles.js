import express from 'express';
import auth from '../middleware/auth.js';
import JobSeeker from '../models/JobSeekerProfile.js';
import Employer from '../models/EmployerProfile.js';

const router = express.Router();

// Get profile
router.get('/me', auth, async (req, res) => {
  try {
    let profile;
    if (req.user.role === 'jobSeeker') {
      profile = await JobSeeker.findOne({ user: req.user.id }).populate('user');
    } else {
      profile = await Employer.findOne({ user: req.user.id }).populate('user');
    }
    
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create/Update Job Seeker Profile
router.post('/jobseeker', auth, async (req, res) => {
  const { fullName, skills, experience, education } = req.body;
  
  const profileFields = {
    user: req.user.id,
    fullName,
    skills,
    experience,
    education
  };

  try {
    let profile = await JobSeeker.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create/Update Employer Profile
router.post('/employer', auth, async (req, res) => {
  const { companyName, website, location, description, contactEmail } = req.body;
  
  const profileFields = {
    user: req.user.id,
    companyName,
    website,
    location,
    description,
    contactEmail
  };

  try {
    let profile = await Employer.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    );
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;