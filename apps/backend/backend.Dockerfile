# Backend Application Dockerfile
FROM node:18.15-slim

WORKDIR /usr/app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install --filter ./packages/types/

RUN pnpm install

COPY . .

EXPOSE 8000

CMD ["pnpm", "backend", "start"]
