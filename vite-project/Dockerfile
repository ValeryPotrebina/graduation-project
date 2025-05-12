FROM node:20-alpine

RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем только package.json и package-lock.json для кэширования зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависсимости
RUN npm ci

# Копируем остальной проект
COPY . .

# Выполняем сборку
RUN npm run build
