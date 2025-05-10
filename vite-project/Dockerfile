FROM node:20-alpine AS base

# Этап установки зависимостей
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы с деревом зависсимостей
COPY package.json package-lock.json ./
# Устанавливаем зависсимости
RUN npm ci

# Этап сборки
FROM base AS builder
WORKDIR /app
ENV NODE_ENV=production
# Копируем зависсимости
COPY --from=deps /app/node_modules ./node_modules
# Копируем исходный код
COPY . .
# Выполняем сборку
RUN npm run build

# Финальный результат с билдом
FROM base AS dist
WORKDIR /app
# Копируем билд
COPY --from=builder /app/dist ./
