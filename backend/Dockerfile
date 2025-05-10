FROM python:3.12-slim

# Устанавливаем переменные окружения
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=2.1.1

# Устанавливаем зависимости для poetry и сборки
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev \
    && pip install "poetry==$POETRY_VERSION"

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем pyproject.toml и poetry.lock
COPY pyproject.toml poetry.lock* ./

# Устанавливаем зависимости через poetry
RUN poetry config virtualenvs.create false \
    && poetry install --no-interaction --no-ansi

# Копируем всё остальное
COPY app ./app

# Копируем .env файл внутрь контейнера (опционально, если нужен фиксированный env)
COPY db.env openai.env static.env ./

# Открываем порт
EXPOSE 9000

# Запускаем приложение
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "9000"]
