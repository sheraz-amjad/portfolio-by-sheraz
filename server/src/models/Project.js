import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['DevOps & Cloud', 'Full Stack (MERN)', 'Mobile (Flutter)', 'Security & Automation'],
      required: true
    },
    technologies: [{ type: String, required: true }],
    highlights: [{ type: String }],
    githubUrl: { type: String, default: 'https://github.com/sherazamjad' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    icon: { type: String, default: 'Server' },
    architectureBadge: { type: String, default: 'Production Ready' },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
