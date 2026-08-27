# ==============================================================================
# Multi-stage Dockerfile for React Vite Client (Syed Sheraz Amjad Portfolio)
# Stage 1: Build static bundle
# Stage 2: Serve optimized assets with Nginx Alpine
# ==============================================================================

# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /

# Copy package manifests first to leverage Docker layer caching
COPY package.json package-lock.json* ./

RUN npm ci

# Copy source code (excluding node_modules via .dockerignore)
COPY . .

# Ensure executable permissions on build binaries and compile bundle
RUN chmod -R +x node_modules/.bin && npm run build

# ==============================================================================
# Stage 2: Production Nginx Runner
# ==============================================================================
FROM nginx:1.27-alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
