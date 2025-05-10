import openai
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.infrastructure.config.settings import settings
import traceback

router = APIRouter(
    prefix=settings.api.openai,
    tags=["openai"],
)

openai.api_key = settings.openai.get_api_key()


class QuestionRequest(BaseModel):
    question: str  # Ожидаем, что в теле запроса будет поле "question"


@router.post("/")
async def ask_openai(request: QuestionRequest):
    try:
        question = request.question
        if not question:
            raise HTTPException(
                status_code=400,
                detail="Question is required"
            )
        response = openai.chat.completions.create(
            model="gpt-4o-mini",
            store=True,
            messages=[{"role": "user", "content": question}]
        )

        return {"answer": response.choices[0].message}
    except Exception as e:
        print(traceback.format_exc())
        raise HTTPException(
            status_code=400,
            detail="Error retrieving answer from OpenAI"
        )
