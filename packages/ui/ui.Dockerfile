# UI Package Dockerfile
FROM node:18.15-slim

WORKDIR /usr/app

COPY package.json .

RUN npm install -g pnpm

RUN pnpm install --filter ./packages/types/
RUN pnpm install --filter ./packages/functions/

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "ui:docs"]
