import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String, required: true },
  coverLetter: String,
  status: { type: String, default: 'Pending', enum: ['Pending', 'Reviewed', 'Rejected', 'Accepted'] },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);