# Используем официальный образ Node.js
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock для установки зависимостей
COPY package.json ./ 
 
# Устанавливаем зависимости
RUN yarn install

# Копируем все остальные файлы в контейнер
COPY . .

# Собираем проект
RUN yarn run build

# Указываем порт, который будет использоваться
EXPOSE 3001

# Запускаем приложение
CMD ["node", "dist/main"]
