FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
CMD ["npm", "i", "-g", "yarn"]
RUN yarn
RUN yarn add pm2 --global

COPY . .

RUN yarn build

WORKDIR /dist

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]