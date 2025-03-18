import mongoose from 'mongoose';

const jobSeekerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fullName: { type: String, required: true },
  skills: [String],
  experience: [{
    title: String,
    company: String,
    duration: String
  }],
  education: [{
    degree: String,
    institution: String,
    year: String
  }]
});

export default mongoose.model('JobSeeker', jobSeekerSchema);