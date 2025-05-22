import openai
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.infrastructure.config.settings import settings
from typing import List, Optional

from app.services import CoursesService, MaterialsService
from app.interfaces.routes.utils import get_courses_service, get_materials_service
from app.domain import Course as DomainCourse, Material as DomainMaterial
from app.common import strings

router = APIRouter(
    prefix=settings.api.openai,
    tags=["openai"],
)

openai.api_key = settings.openai.get_api_key()

class QuestionRequest(BaseModel):
    question: str

async def _format_materials_for_context(
    materials: List[DomainMaterial],
    material_db_type: str, 
    course_name: str
) -> List[str]:
    """Вспомогательная функция для форматирования списка материалов одного типа."""
    output_parts = []
    if not materials:
        material_type_rus_plural, _ = strings.MATERIAL_TYPE_TRANSLATIONS_RUS.get(
            material_db_type, ("неизвестного типа", "Материал")
        )
        output_parts.append(strings.CONTEXT_MATERIALS_NOT_FOUND.format(
            material_type_rus_plural=material_type_rus_plural, course_name=course_name
        ))
        return output_parts

    material_type_rus_plural, material_type_rus_singular = strings.MATERIAL_TYPE_TRANSLATIONS_RUS.get(
        material_db_type, ("материалы", "Материал")
    )

    output_parts.append(strings.CONTEXT_MATERIALS_FOUND_HEADER.format(
        course_name=course_name, 
        material_type_rus_plural=material_type_rus_plural, 
        count=len(materials)
    ))

    for i, material_item in enumerate(materials):
        material_number_or_index = material_item.number if material_item.number is not None else i + 1
        material_name_display = material_item.name if material_item.name else strings.CONTEXT_MATERIAL_DEFAULT_NAME.format(
            material_type_rus_singular=material_type_rus_singular, 
            material_number_or_index=material_number_or_index
        )
        
        content_preview = ""
        if material_item.content:
            content_preview = strings.CONTEXT_MATERIAL_CONTENT_PREVIEW.format(content_preview=material_item.content[:50])
        
        output_parts.append(f"  {i + 1}. {material_name_display}{content_preview}")
    return output_parts

async def get_context_from_db(
    question: str,
    courses_service: CoursesService,
    materials_service: MaterialsService
) -> str:
    normalized_question = question.lower()
    context_parts = []

    teacher_requested = any(kw in normalized_question for kw in strings.KEYWORDS_TEACHER)
    description_requested = any(kw in normalized_question for kw in strings.KEYWORDS_DESCRIPTION)
    labs_requested = any(kw in normalized_question for kw in strings.KEYWORDS_LABS)
    hours_requested = any(kw in normalized_question for kw in strings.KEYWORDS_HOURS)
    lectures_requested = any(kw in normalized_question for kw in strings.KEYWORDS_LECTURES)
    seminars_requested = any(kw in normalized_question for kw in strings.KEYWORDS_SEMINARS)
    all_materials_requested = any(kw in normalized_question for kw in strings.KEYWORDS_ALL_MATERIALS)

    if all_materials_requested:
        labs_requested = True
        lectures_requested = True
        seminars_requested = True
    
    all_db_courses: List[DomainCourse] = await courses_service.get_courses()
    
    sorted_courses = sorted(all_db_courses, key=lambda c: len(c.name) if c.name else 0, reverse=True)
    
    found_db_course: Optional[DomainCourse] = None
    for db_course_candidate in sorted_courses:
        if db_course_candidate.name and db_course_candidate.name.lower() in normalized_question:
            found_db_course = db_course_candidate
            break
    
    if found_db_course:
        course_name = found_db_course.name
        context_parts.append(strings.CONTEXT_COURSE_INFO.format(course_name=course_name))

        is_general_query = not (teacher_requested or description_requested or labs_requested or hours_requested)
        is_specific_info_requested = (
            teacher_requested or description_requested or hours_requested or 
            labs_requested or lectures_requested or seminars_requested
        )
        is_general_query_for_course_details = not is_specific_info_requested
        if teacher_requested or is_general_query: 
            teacher_info_from_db = found_db_course.teacher
            display_teacher = strings.DEFAULT_TEACHER_DISPLAY_NAME_IF_UNKNOWN
            if teacher_info_from_db and teacher_info_from_db.strip() != strings.DEFAULT_TEACHER_NAME_IF_ABSENT:
                display_teacher = teacher_info_from_db
            
            context_parts.append(strings.CONTEXT_TEACHER_INFO.format(teacher_info=display_teacher))

        if description_requested or is_general_query: 
            if found_db_course.description:
                context_parts.append(strings.CONTEXT_DESCRIPTION_INFO.format(description=found_db_course.description))
            elif description_requested:
                context_parts.append(strings.CONTEXT_DESCRIPTION_NOT_FOUND)
        
        if hours_requested or is_general_query: 
            if found_db_course.hours is not None:
                context_parts.append(strings.CONTEXT_HOURS_INFO.format(hours=found_db_course.hours))
            elif hours_requested:
                context_parts.append(strings.CONTEXT_HOURS_NOT_FOUND)

        if labs_requested or lectures_requested or seminars_requested or all_materials_requested: 
            materials_context_generated = False
            if found_db_course.id is not None:
                all_course_materials: Optional[List[DomainMaterial]] = None 

                async def fetch_and_format_materials(material_db_type_to_fetch: str):
                    nonlocal all_course_materials, context_parts, materials_context_generated
                    try:
                        if all_course_materials is None and (lectures_requested or seminars_requested or labs_requested or all_materials_requested):
                            all_course_materials = await materials_service.get_materials_by_course_id(found_db_course.id)
                        
                        if all_course_materials is not None:
                            specific_materials = [m for m in all_course_materials if m.material_type == material_db_type_to_fetch]
                            formatted_parts = await _format_materials_for_context(specific_materials, material_db_type_to_fetch, course_name)
                            context_parts.extend(formatted_parts)
                            if specific_materials: 
                                materials_context_generated = True

                    except Exception: 
                        material_type_rus_plural, _ = strings.MATERIAL_TYPE_TRANSLATIONS_RUS.get(material_db_type_to_fetch, ("материалы", ""))
                        context_parts.append(strings.CONTEXT_MATERIALS_LOAD_ERROR.format(
                            material_type_rus_plural=material_type_rus_plural, course_name=course_name
                        ))
                
                if all_materials_requested and len(context_parts) <= 1: 
                    context_parts.append(strings.CONTEXT_ALL_MATERIALS_INTRO.format(course_name=course_name))

                if lectures_requested:
                    await fetch_and_format_materials(strings.MATERIAL_TYPE_DB_LECTURES)
                if seminars_requested:
                    await fetch_and_format_materials(strings.MATERIAL_TYPE_DB_SEMINARS)
                if labs_requested: 
                    await fetch_and_format_materials(strings.MATERIAL_TYPE_DB_LABS)
                
                is_material_keywords_present = any(kw in normalized_question for kw in strings.KEYWORDS_ALL_MATERIALS + strings.KEYWORDS_LECTURES + strings.KEYWORDS_SEMINARS + strings.KEYWORDS_LABS)
                if is_material_keywords_present and not materials_context_generated and not is_general_query_for_course_details:
                    context_parts.append(strings.CONTEXT_NO_SPECIFIC_MATERIALS_REQUESTED.format(course_name=course_name))

            elif labs_requested or lectures_requested or seminars_requested or all_materials_requested: 
                context_parts.append(strings.CONTEXT_COURSE_ID_FOR_MATERIALS_NOT_FOUND.format(course_name=course_name))
    else: 
        if teacher_requested or description_requested or hours_requested or labs_requested or lectures_requested or seminars_requested or all_materials_requested:
            context_parts.append(strings.MSG_COURSE_NOT_IDENTIFIED)

    if not context_parts:
        if normalized_question.strip(): 
            return strings.MSG_REQUEST_INFO_NOT_FOUND.format(question=question)
        else: 
            return strings.MSG_GENERAL_ASSISTANCE_PROMPT
            
    return "\n".join(context_parts)

@router.post("/")
async def ask_openai(
    request: QuestionRequest,
    courses_service: CoursesService = Depends(get_courses_service),
    materials_service: MaterialsService = Depends(get_materials_service)
):
    try:
        question = request.question
        if not question or not question.strip(): 
            raise HTTPException(
                status_code=400,
                detail=strings.HTTP_DETAIL_QUESTION_EMPTY
            )
        
        retrieved_context_str = await get_context_from_db(question, courses_service, materials_service)

        messages_for_openai = []
        # Check if the context is generic or unhelpful
        is_generic_context = False
        if retrieved_context_str == strings.MSG_GENERAL_ASSISTANCE_PROMPT or \
           retrieved_context_str == strings.MSG_REQUEST_INFO_NOT_FOUND.format(question=question) or \
           retrieved_context_str == strings.MSG_COURSE_NOT_IDENTIFIED:
            is_generic_context = True

        if is_generic_context:
            # If context is generic, let OpenAI respond generally to the question
            messages_for_openai.append({"role": "user", "content": question})
            # Optionally, add a very mild system prompt if desired, e.g.:
            # messages_for_openai.insert(0, {"role": "system", "content": "You are a helpful assistant."})
        else:
            # If context is meaningful, use the RAG approach
            system_prompt = strings.OPENAI_SYSTEM_PROMPT
            user_message_content = strings.OPENAI_USER_MESSAGE_TEMPLATE.format(
                retrieved_context=retrieved_context_str,
                question=question
            )
            messages_for_openai.append({"role": "system", "content": system_prompt})
            messages_for_openai.append({"role": "user", "content": user_message_content})
        
        response = openai.chat.completions.create(
            model="gpt-4o-mini", 
            messages=messages_for_openai
        )
        
        answer_text = response.choices[0].message.content if response.choices and response.choices[0].message else strings.OPENAI_DEFAULT_ERROR_RESPONSE
        
        return {strings.OPENAI_RESPONSE_ANSWER_KEY: answer_text}
    except HTTPException: 
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=strings.HTTP_DETAIL_INTERNAL_SERVER_ERROR_OPENAI.format(error_message=str(e))
        )
