# Dockerfile
FROM node:22-alpine3.19

WORKDIR /app

RUN mv /app/.env-example /app/.env

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
