FROM node:24-alpine AS deps

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm ci


FROM node:24-bookworm AS builder

WORKDIR /app

COPY --from=deps ./app/node_modules ./node_modules
COPY ./frontend .

EXPOSE 3000

CMD ["npm", "run", "dev",  "--", "-H", "0.0.0.0"]