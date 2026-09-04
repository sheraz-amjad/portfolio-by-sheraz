import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class ContactMessage extends Model {}

ContactMessage.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    subject: { type: DataTypes.STRING, defaultValue: 'New Portfolio Contact Message' },
    message: { type: DataTypes.TEXT, allowNull: false },
    ipAddress: { type: DataTypes.STRING, defaultValue: '' },
    userAgent: { type: DataTypes.TEXT, defaultValue: '' },
    isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  { sequelize, modelName: 'ContactMessage', tableName: 'contact_messages', timestamps: true }
);

export default ContactMessage;
