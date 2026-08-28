#!/bin/bash
set -e

# ============================================================================
# deploy.sh — Pulls latest Docker images and restarts containers with a
# basic health check + automatic rollback if the new deployment fails.
# ============================================================================

DOCKER_USER="sherazdevops"
SERVER_IMAGE="${DOCKER_USER}/portfolio-server:latest"
CLIENT_IMAGE="${DOCKER_USER}/portfolio-client:latest"
HEALTH_URL="http://localhost:5000/api/health"
MAX_RETRIES=10
RETRY_DELAY=3
APP_DIR="/home/ubuntu/portfolio"

# Ensure app directory and network exist
cd "$APP_DIR" 2>/dev/null || true
docker network create portfolio-network 2>/dev/null || true

echo "📥 Pulling latest images from Docker Hub..."
docker pull "$SERVER_IMAGE" || true
docker pull "$CLIENT_IMAGE" || true

echo "📦 Remembering currently running image IDs (for rollback)..."
OLD_SERVER_ID=$(docker inspect --format='{{.Image}}' portfolio-server 2>/dev/null || echo "")
OLD_CLIENT_ID=$(docker inspect --format='{{.Image}}' portfolio-client 2>/dev/null || echo "")

echo "🛑 Stopping old containers (if running)..."
docker stop portfolio-server portfolio-client 2>/dev/null || true
docker rm portfolio-server portfolio-client 2>/dev/null || true

echo "🚀 Starting new containers..."
if [ -f "$APP_DIR/server/.env" ]; then
  ENV_FLAG="--env-file $APP_DIR/server/.env"
elif [ -f "$APP_DIR/.env" ]; then
  ENV_FLAG="--env-file $APP_DIR/.env"
else
  ENV_FLAG="-e PORT=5000 -e NODE_ENV=production -e MONGO_URI=mongodb://127.0.0.1:27017/portfolio"
fi

docker run -d --name portfolio-server \
  --restart unless-stopped \
  --network portfolio-network \
  -p 5000:5000 \
  $ENV_FLAG \
  "$SERVER_IMAGE"

docker run -d --name portfolio-client \
  --restart unless-stopped \
  --network portfolio-network \
  -p 80:80 \
  "$CLIENT_IMAGE"

echo "🩺 Running health check on $HEALTH_URL ..."
SUCCESS=false
for i in $(seq 1 $MAX_RETRIES); do
  if curl -sf "$HEALTH_URL" > /dev/null; then
    echo "✅ Health check passed on attempt $i."
    SUCCESS=true
    break
  fi
  echo "⏳ Attempt $i/$MAX_RETRIES failed, retrying in ${RETRY_DELAY}s..."
  sleep $RETRY_DELAY
done

if [ "$SUCCESS" = false ]; then
  echo "❌ Health check failed after $MAX_RETRIES attempts. Rolling back..."

  docker stop portfolio-server portfolio-client 2>/dev/null || true
  docker rm portfolio-server portfolio-client 2>/dev/null || true

  if [ -n "$OLD_SERVER_ID" ]; then
    docker run -d --name portfolio-server --restart unless-stopped --network portfolio-network -p 5000:5000 \
      $ENV_FLAG "$OLD_SERVER_ID"
  fi
  if [ -n "$OLD_CLIENT_ID" ]; then
    docker run -d --name portfolio-client --restart unless-stopped --network portfolio-network -p 80:80 "$OLD_CLIENT_ID"
  fi

  echo "🔙 Rolled back to previous working images."
  exit 1
fi

echo "🧹 Cleaning up unused images..."
docker image prune -f

echo "======================================================"
echo "✅ Deployment successful!"
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com || curl -s https://api.ipify.org || echo "YOUR_EC2_PUBLIC_IP")
echo "🌐 Live at: http://$PUBLIC_IP/"
echo "======================================================"
