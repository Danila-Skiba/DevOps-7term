FROM node:22-bookworm AS browser-base

WORKDIR /app
ENV PLAYWRIGHT_BROWSERS_PATH=/opt/playwright

COPY package.json package-lock.json ./
RUN npm ci --omit=dev
RUN npx --no-install playwright install --with-deps chromium \
    && rm -rf /var/lib/apt/lists/*

FROM browser-base AS runtime

ENV NODE_ENV=production
COPY src/ ./src/
CMD ["node", "src/scraper.js"]
