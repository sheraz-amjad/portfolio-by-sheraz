import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, default: 'Pakistan' },
    roleType: { type: String, enum: ['DevOps', 'Full Stack', 'Mobile', 'Cloud'], default: 'DevOps' },
    description: [{ type: String, required: true }],
    technologies: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experienceSchema);
