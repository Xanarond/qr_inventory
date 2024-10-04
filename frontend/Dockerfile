FROM node:20-alpine

# Установка рабочей директории
WORKDIR /app

# Установка зависимостей и сборка в одном слое
COPY package.json ./ 
RUN yarn install

COPY . .

RUN yarn build

# Установка рабочей директории для запуска приложения
WORKDIR /app/dist

# Открытие порта для Vite
EXPOSE 4173

# Запуск Vite
CMD ["yarn", "preview"]