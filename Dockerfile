# Dockerfile
FROM node:22-alpine3.19

WORKDIR /app

RUN mv .env-example .env

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "index.js"]
