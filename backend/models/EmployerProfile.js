import mongoose from 'mongoose';

const employerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  website: String,
  location: String,
  description: String,
  contactEmail: String
});

export default mongoose.model('Employer', employerSchema);