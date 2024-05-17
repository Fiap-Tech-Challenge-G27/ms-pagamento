FROM node:18-alpine

RUN npm i -g @nestjs/cli
RUN apk add --no-cache curl

USER node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENTRYPOINT ["npm", "run", "start:dev"]