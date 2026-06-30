# Marenka CMS — production image
FROM node:22-bookworm-slim

WORKDIR /app

# Install dependencies first (better layer caching). better-sqlite3 ships
# prebuilt binaries, but keep build tools available as a fallback.
COPY package.json package-lock.json* ./
RUN npm install --omit=dev || npm install --omit=dev

COPY . .

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

# The SQLite database lives in /app/data — mount a volume to persist it.
VOLUME ["/app/data"]

CMD ["node", "server.js"]
