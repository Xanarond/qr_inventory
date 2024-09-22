FROM node:20-alpine

WORKDIR /app

# Установка зависимостей и сборка в одном слое
COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

WORKDIR /dist

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]