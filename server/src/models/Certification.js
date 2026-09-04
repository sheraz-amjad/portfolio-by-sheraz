import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Certification extends Model {}

Certification.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    issuer: { type: DataTypes.STRING, allowNull: false },
    instructor: { type: DataTypes.STRING, defaultValue: '' },
    period: { type: DataTypes.STRING, defaultValue: '' },
    type: { type: DataTypes.ENUM('Certification', 'Training', 'Self-Directed', 'Education'), defaultValue: 'Certification' },
    description: { type: DataTypes.TEXT, allowNull: false },
    topics: { type: DataTypes.JSONB, defaultValue: [] },
    credentialUrl: { type: DataTypes.STRING, defaultValue: '' },
    order: { type: DataTypes.INTEGER, defaultValue: 0 }
  },
  { sequelize, modelName: 'Certification', tableName: 'certifications', timestamps: true }
);

export default Certification;
