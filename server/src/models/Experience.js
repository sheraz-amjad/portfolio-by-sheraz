import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Experience extends Model {}

Experience.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    company: { type: DataTypes.STRING, allowNull: false },
    period: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, defaultValue: 'Pakistan' },
    roleType: { type: DataTypes.ENUM('DevOps', 'Full Stack', 'Mobile', 'Cloud'), defaultValue: 'DevOps' },
    description: { type: DataTypes.JSONB, allowNull: false },
    technologies: { type: DataTypes.JSONB, defaultValue: [] },
    order: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { sequelize, modelName: 'Experience', tableName: 'experiences', timestamps: true }
);

export default Experience;
