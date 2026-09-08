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
        DATABASE_URL: "mysql://portfolio:sheraz@127.0.0.1:3306/portfolio",
        DATABASE_SSL: "false",
        EMAIL_USER: "sherazamjad933@gmail.com",
        EMAIL_PASS: "gjkvxmvsubwptkjz",
        EMAIL_SERVICE: "gmail",
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
        DATABASE_URL: "mysql://portfolio:sheraz@127.0.0.1:3306/portfolio",
        DATABASE_SSL: "false",
        EMAIL_USER: "sherazamjad933@gmail.com",
        EMAIL_PASS: "gjkvxmvsubwptkjz",
        EMAIL_SERVICE: "gmail",
      }
    }
  ]
};