#!/bin/bash
set -e

# ============================================================================
# deploy.sh — Builds and runs the complete production stack with Docker Compose.
# ============================================================================
APP_DIR="/var/www/portfolio"
cd "$APP_DIR"

if ! command -v docker >/dev/null 2>&1 || ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose is required. Install Docker Engine with the Compose plugin first."
  exit 1
fi

if [ ! -f "$APP_DIR/server/.env" ]; then
  echo "Missing $APP_DIR/server/.env"
  echo "Create it from server/.env.example and set the MongoDB Atlas MONGO_URI."
  exit 1
fi

if ! grep -Eq '^MONGO_URI=mongodb\+srv://' "$APP_DIR/server/.env"; then
  echo "server/.env must contain a MongoDB Atlas MONGO_URI (mongodb+srv://...)."
  exit 1
fi
echo "📦 Building application images..."
docker compose build --pull
echo "🚀 Starting the production stack..."
docker compose up -d --remove-orphans

echo "🩺 Waiting for the API health check..."
for i in $(seq 1 20); do
  if docker compose exec -T server wget --no-verbose --tries=1 --spider http://localhost:5000/api/health >/dev/null 2>&1; then
    echo "✅ API health check passed."
    break
  fi
  if [ "$i" -eq 20 ]; then
    echo "❌ API health check failed. Recent container logs:"
    docker compose logs --tail=80 server
    exit 1
  fi
  sleep 3
done

echo "🧹 Cleaning up unused images..."
docker image prune -f

echo "======================================================"
echo "✅ Deployment successful!"
echo "🌐 Live at: https://syedsheraz.me/"
echo "======================================================"
