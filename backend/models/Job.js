import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [String],
  location: String,
  salary: Number,
  employmentType: { type: String, enum: ['Full-time', 'Part-time', 'Contract'] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Job', jobSchema);