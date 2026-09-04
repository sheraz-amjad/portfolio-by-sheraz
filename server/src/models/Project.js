import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Project extends Model {}

Project.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    tagline: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    category: { type: DataTypes.ENUM('DevOps & Cloud', 'Full Stack (MERN)', 'Mobile (Flutter)', 'Security & Automation'), allowNull: false },
    technologies: { type: DataTypes.JSONB, allowNull: false },
    highlights: { type: DataTypes.JSONB, defaultValue: [] },
    githubUrl: { type: DataTypes.STRING, defaultValue: 'https://github.com/sherazamjad' },
    liveUrl: { type: DataTypes.STRING, defaultValue: '' },
    featured: { type: DataTypes.BOOLEAN, defaultValue: false },
    order: { type: DataTypes.INTEGER, defaultValue: 0 },
    icon: { type: DataTypes.STRING, defaultValue: 'Server' },
    architectureBadge: { type: DataTypes.STRING, defaultValue: 'Production Ready' }
  },
  { sequelize, modelName: 'Project', tableName: 'projects', timestamps: true }
);

export default Project;
