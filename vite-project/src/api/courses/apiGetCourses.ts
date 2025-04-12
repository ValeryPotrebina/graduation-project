import requester from '@/lib/axios/requester'
import { COURSES_LIST } from '@/constants/endpoints'
import { Course } from '@/types/data'
import { ApiResponse } from '@/types/api'

export default async function apiGetCourses(): Promise<Course[]> {
  try {
    const response = await requester.get<ApiResponse<Course[]>>(
      COURSES_LIST,
      {},
    )
    console.log('response courses', response)
    return response.data.data
  } catch (error) {
    throw error
  }
}
