import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

const databaseUrl =
  process.env.DATABASE_URL || 'mysql://portfolio:portfolio@127.0.0.1:3306/portfolio';

export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql',
  logging: false,
  dialectOptions:
    process.env.DATABASE_SSL === 'true'
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : {}
});

export const connectDB = async () => {
  if (isConnected) {
    console.log('ℹ️  MySQL already connected');
    return;
  }

  try {
    console.log('\n🔌 Connecting to MySQL...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    await sequelize.authenticate();
    await sequelize.sync();
    isConnected = true;
    console.log('✅ MySQL connected successfully');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.warn('\n❌ MySQL Connection Error');
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.warn(`⚠️  ${error.message}`);
    console.warn('ℹ️  Server will continue running. API endpoints will serve fallback data.');
    console.warn('💡 Fix: Ensure MySQL is running and DATABASE_URL is correct.');
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
};

export const getDBStatus = () => {
  return {
    connected: isConnected,
    dialect: 'mysql',
    database: sequelize.config.database || 'none',
    host: sequelize.config.host || 'none'
  };
};

export const isDBReady = () => isConnected;

export default connectDB;