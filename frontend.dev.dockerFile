FROM node:24-alpine

RUN addgroup -g 1001 next \
    && adduser -D -u 1001 -G next -h /home/next -s /sbin/nologin next

WORKDIR /app

RUN chown next:next /app

COPY --chown=next:next ./frontend/package.json ./frontend/package-lock.json ./

USER next

RUN npm ci

COPY --chown=next:next ./frontend ./

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
