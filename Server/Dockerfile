FROM node:16.14.2-alpine as builder
WORKDIR /nodeServer
COPY Server/package.json .
COPY Server/package-lock.json .
RUN npm install

COPY Server/src/ ./src/
COPY .env .
COPY Server/tsconfig.json .
COPY Server/public/ .public/

RUN npm run build
CMD ["node", "./dist/index.js"]