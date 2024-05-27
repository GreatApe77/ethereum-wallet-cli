FROM node:20-alpine3.17

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

CMD [ "npm","run","start" ]