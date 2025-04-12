import requester from '@/lib/axios/requester'
import { USERS_FEATURED_COURSES } from '@/constants/endpoints'
import { Course } from '@/types/data'
import { ApiResponse } from '@/types/api'

export default async function apiGetFeaturedCourse(): Promise<Course[]> {
  try {
    const response = await requester.get<ApiResponse<Course[]>>(
      USERS_FEATURED_COURSES,
    )
    console.log('response', response)
    return response.data.data // Возвращаем { data: { ...userData } }
  } catch (error) {
    throw error
  }
}
