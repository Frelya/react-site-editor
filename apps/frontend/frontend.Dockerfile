# Frontend Application Dockerfile
FROM node:18.15-slim

WORKDIR /usr/app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install --filter ./packages/types/
RUN pnpm install --filter ./packages/functions/
RUN pnpm install --filter ./packages/ui/

RUN pnpm install

COPY . .

EXPOSE 5179

CMD ["pnpm", "frontend", "start", "--host"]
