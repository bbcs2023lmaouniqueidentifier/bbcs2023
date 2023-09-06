
FROM node:18-alpine

WORKDIR /app

COPY --link package.json package-lock.json*  ./
RUN npm ci

COPY --link src ./src
COPY --link public ./public
COPY --link tsconfig.json .
COPY --link next.config.js .
COPY --link .env ./.env
COPY --link .env.development ./.env.development

ENV NEXT_TELEMETRY_DISABLED 1

CMD npm run dev
