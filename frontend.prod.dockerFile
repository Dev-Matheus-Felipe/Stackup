FROM node:24-bookworm AS deps

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci

FROM node:24-bookworm AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./frontend .

RUN npm run build


FROM gcr.io/distroless/nodejs24-debian12:nonroot

WORKDIR /app

COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD [ "server.js" ]