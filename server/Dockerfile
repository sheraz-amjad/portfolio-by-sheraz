# ==============================================================================
# Multi-stage Dockerfile for Node.js + Express Server (Syed Sheraz Amjad Portfolio)
# ==============================================================================

# Stage 1: Dependencies & Build
FROM node:22-alpine AS dependencies

WORKDIR /app

COPY package.json package-lock.json* ./

# Install production dependencies only
RUN npm ci --only=production

# ==============================================================================
# Stage 2: Minimal Production Runtime
# ==============================================================================
FROM node:22-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Copy node_modules from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules
COPY package.json ./
COPY src/ ./src/

# Security: Run as non-root unprivileged node user
USER node

# Expose internal API port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

# Start production server
CMD ["node", "src/server.js"]
