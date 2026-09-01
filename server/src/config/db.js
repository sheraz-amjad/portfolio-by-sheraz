import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
  
  if (isConnected) {
    console.log('ℹ️  MongoDB already connected');
    return;
  }

  mongoose.set('bufferCommands', false);

  try {
    console.log('\n🔌 Connecting to MongoDB...');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📍 URI: ${uri}`);
    
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected successfully`);
    console.log(`🏠 Host: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.warn('\n❌ MongoDB Connection Error');
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.warn(`⚠️  ${error.message}`);
    console.warn('ℹ️  Server will continue running. API endpoints will serve fallback data.');
    console.warn('💡 Fix: Ensure MongoDB is running with: sudo systemctl start mongod');
    console.warn('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }
};

export const getDBStatus = () => {
  return {
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    host: mongoose.connection.host || 'none',
    name: mongoose.connection.name || 'none'
  };
};

export default connectDB;
