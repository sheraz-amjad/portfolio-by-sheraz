import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './seed/seeder.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Root test route
app.get('/', (req, res) => {
  res.json({
    message: 'Syed Sheraz Amjad Portfolio API is running',
    documentation: '/api/health',
    version: '1.0.0'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start Server & Initialize DB
const startServer = async () => {
  // Connect to DB and auto-seed if possible
  await connectDB();
  await seedDatabase(false);

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n====================================================`);
    console.log(`🚀 Portfolio Express Backend Started`);
    console.log(`====================================================`);
    console.log(`📍 Port: ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔌 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📧 Email Configured: ${process.env.EMAIL_USER ? '✅ Yes' : '❌ No'}`);
    console.log(`💾 PostgreSQL: ${process.env.DATABASE_URL || 'Default (localhost:5432)'}`);
    console.log(`====================================================\n`);
  });

  // Handle termination gracefully
  const shutdown = () => {
    console.log('\n\n====================================================');
    console.log('🛑 Shutting down gracefully...');
    console.log('====================================================\n');
    server.close(() => {
      console.log('HTTP server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
};

startServer();
