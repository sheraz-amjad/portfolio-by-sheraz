import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['DevOps & Cloud', 'Full Stack (MERN)', 'Mobile Dev', 'Firebase', 'Tools & Practices'],
      required: true
    },
    level: { type: Number, default: 85, min: 1, max: 100 },
    iconName: { type: String, default: 'Code' },
    tags: [{ type: String }],
    featuredIn3D: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
