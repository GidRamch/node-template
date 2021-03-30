FROM node:14-alpine

WORKDIR /src
COPY package*.json ./
COPY .env ./

RUN npm ci

COPY ./build .

CMD ["node", "src/bin/www.js"]