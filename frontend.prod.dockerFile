FROM node:24-alpine AS deps

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci

FROM node:24-bookworm AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./frontend .

RUN npm run build

RUN mkdir -p /output/etc && \
  echo "next:x:1001:1001:Next User:/app:/sbin/nologin" > /output/etc/passwd && \
  echo "next:x:1001:" > /output/etc/group


FROM gcr.io/distroless/nodejs24-debian12

WORKDIR /app

COPY --from=builder /output/etc/passwd /etc/passwd
COPY --from=builder /output/etc/group /etc/group

COPY --from=builder --chown=next /app/.next/static ./.next/static
COPY --from=builder --chown=next /app/.next/standalone ./
COPY --from=builder --chown=next /app/public ./public

USER next
EXPOSE 3000

CMD [ "server.js" ]