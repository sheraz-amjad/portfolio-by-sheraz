module.exports = {
  apps: [
    {
      name: "portfolio-api",
      script: "./server/src/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        MONGO_URI: "mongodb://127.0.0.1:27017/portfolio",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
        MONGO_URI: "mongodb://127.0.0.1:27017/portfolio",
      }
    }
  ]
};
