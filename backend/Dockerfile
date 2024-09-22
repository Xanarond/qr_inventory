# Используем официальный образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и yarn.lock для установки зависимостей
COPY package.json yarn.lock ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы в контейнер
COPY . .

# Собираем проект
RUN npm run build

# Указываем порт, который будет использоваться
EXPOSE 3000

# Запускаем приложение
CMD ["node", "dist/main"]
