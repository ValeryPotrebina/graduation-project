import requester from '@/lib/axios/requester'
import { Course } from '@/types/data'
import { COURSES_CREATE } from '@/constants/endpoints'
import { ApiResponse } from '@/types/api'

interface CreateCourseData {
  name: string
  description: string
  semester: number
  teacher: string
  hours: number
}

export default async function apiPostCourse(courseData: CreateCourseData): Promise<Course> {
  const response = await requester.post<ApiResponse<Course>>(COURSES_CREATE, courseData)
  return response.data.data
}


