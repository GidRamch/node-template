FROM node:14-alpine

WORKDIR /src
COPY package*.json ./
COPY .env ./

EXPOSE 3000

RUN npm ci

COPY ./build .

CMD ["node", "src/bin/www.js"]