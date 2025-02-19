from openai import OpenAI
import os
from dotenv import load_dotenv


load_dotenv("config.env")

# Получаем API-ключ
api_key = os.getenv("API_KEY")

if api_key is None:
    raise ValueError("API-ключ не найден! Проверьте config.env")

client = OpenAI(
  api_key=api_key
)

# Числовое  множество,  ограниченное  и  сверху,  и  снизу,  называется 
# ограниченным.
completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": """Проверь на сколько верно я ответил на вопрос: "Какое числовое множество называется ограниченным?". Мой ответ: "Числовое  множество,  ограниченное сверху, называется ограниченным." """},
  ]
)

print(completion.choices[0].message)
