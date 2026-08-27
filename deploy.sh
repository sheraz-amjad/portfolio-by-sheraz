#!/usr/bin/env bash
# ==============================================================================
# AWS EC2 Automated Deployment Script for Syed Sheraz Amjad Portfolio
# Target: Ubuntu 22.04 / 24.04 LTS (Plain HTTP via Public IP)
# ==============================================================================

set -e # Exit immediately if a command exits with a non-zero status

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WEB_ROOT="/var/www/portfolio"
NGINX_CONF_SRC="$APP_DIR/nginx/portfolio.conf"
NGINX_CONF_DEST="/etc/nginx/sites-available/portfolio"

echo "======================================================"
echo "🚀 Starting Deployment: Syed Sheraz Amjad MERN Portfolio"
echo "📂 Working Directory: $APP_DIR"
echo "======================================================"

# 1. Ensure required system utilities and web root directory
echo "📦 Step 1: Checking system directories and permissions..."
sudo mkdir -p "$WEB_ROOT"
sudo chown -R $USER:$USER "$WEB_ROOT"

# 2. Install Server Dependencies
echo "📦 Step 2: Installing backend dependencies..."
cd "$APP_DIR/server"
npm ci --production=false

# Check if .env exists, if not copy .env.example
if [ ! -f "$APP_DIR/server/.env" ]; then
    echo "⚠️  server/.env not found, copying from .env.example..."
    cp "$APP_DIR/server/.env.example" "$APP_DIR/server/.env"
fi

# 3. Seed Database if required
echo "🌱 Step 3: Seeding database if initial run..."
npm run seed || echo "⚠️  Seeding completed or skipped."

# 4. Install Frontend Dependencies & Build
echo "⚛️  Step 4: Building client SPA..."
cd "$APP_DIR/client"
npm ci
npm run build

# 5. Copy Built Frontend Assets to Nginx Web Root
echo "🚚 Step 5: Syncing static build to $WEB_ROOT..."
sudo rm -rf "$WEB_ROOT"/*
sudo cp -r "$APP_DIR/client/dist/"* "$WEB_ROOT/"
sudo chown -R www-data:www-data "$WEB_ROOT"

# 6. Configure Nginx
echo "🌐 Step 6: Configuring Nginx reverse proxy..."
if [ -f "$NGINX_CONF_SRC" ]; then
    sudo cp "$NGINX_CONF_SRC" "$NGINX_CONF_DEST"
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo ln -sf "$NGINX_CONF_DEST" /etc/nginx/sites-enabled/portfolio
    sudo nginx -t
    sudo systemctl reload nginx
    echo "✅ Nginx configured and reloaded."
fi

# 7. Start / Restart Backend with PM2
echo "⚡ Step 7: Starting / Reloading backend with PM2..."
cd "$APP_DIR"
if command -v pm2 &> /dev/null; then
    pm2 startOrReload ecosystem.config.cjs --env production
    pm2 save
else
    echo "⚠️  PM2 not found globally, installing pm2..."
    sudo npm install -g pm2
    pm2 startOrReload ecosystem.config.cjs --env production
    pm2 save
fi

# 8. Success Output
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || curl -s https://api.ipify.org || echo "YOUR_EC2_PUBLIC_IP")

echo "======================================================"
echo "🎉 DEPLOYMENT SUCCESSFUL!"
echo "🌐 Portfolio is live at: http://$PUBLIC_IP/"
echo "🔌 API is available at:  http://$PUBLIC_IP/api/health"
echo "======================================================"
