
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Build the NestJS app
COPY tsconfig.json tsconfig.build.json nest-cli.json ./
COPY src ./src
RUN npm run build


FROM node:20-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app

# Run as a non-root user
RUN addgroup -S app && adduser -S app -G app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Compiled output from the build stage
COPY --from=build /app/dist ./dist

USER app

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-4000}/api/health" > /dev/null || exit 1

CMD ["node", "dist/main"]
