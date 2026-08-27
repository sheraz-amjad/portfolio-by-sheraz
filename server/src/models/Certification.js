import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    instructor: { type: String, default: '' },
    period: { type: String, default: '' },
    type: { type: String, enum: ['Certification', 'Training', 'Self-Directed', 'Education'], default: 'Certification' },
    description: { type: String, required: true },
    topics: [{ type: String }],
    credentialUrl: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Certification', certificationSchema);
