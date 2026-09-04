import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Skill extends Model {}

Skill.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.ENUM('DevOps & Cloud', 'Full Stack (MERN)', 'Mobile Dev', 'Firebase', 'Tools & Practices'), allowNull: false },
    level: { type: DataTypes.INTEGER, defaultValue: 85, validate: { min: 1, max: 100 } },
    iconName: { type: DataTypes.STRING, defaultValue: 'Code' },
    tags: { type: DataTypes.JSONB, defaultValue: [] },
    featuredIn3D: { type: DataTypes.BOOLEAN, defaultValue: false },
    order: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { sequelize, modelName: 'Skill', tableName: 'skills', timestamps: true }
);

export default Skill;
