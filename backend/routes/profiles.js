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
      profile = await JobSeeker.findOne({ user: req.user.id });
    } else {
      profile = await Employer.findOne({ user: req.user.id });
    }

    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create/Update Job Seeker Profile
router.post('/jobseeker', auth, async (req, res) => {
  try {
    const { fullName, skills, experience, education } = req.body;
    
    if (!fullName) {
      return res.status(400).json({ message: 'Full name is required' });
    }

    const profileFields = {
      user: req.user.id,
      fullName,
      skills,
      experience,
      education
    };

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
