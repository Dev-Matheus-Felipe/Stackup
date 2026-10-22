FROM node:24-alpine AS deps

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "dev",  "--", "-H", "0.0.0.0"]