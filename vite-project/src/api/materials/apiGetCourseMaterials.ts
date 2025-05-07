import requester from '@/lib/axios/requester'
import { MATERIALS, COURSES_LIST } from '@/constants/endpoints'
import { Material } from '@/types/data'
import { ApiResponse } from '@/types/api'

export default async function apiGetCourseMaterials(
  course_id: number,
): Promise<Material[]> {
  try {
    const response = await requester.get<ApiResponse<Material[]>>(
      `${COURSES_LIST}/${course_id}${MATERIALS}`,
    )
    console.log('response materials', response.data.data)
    return response.data.data
  } catch (error) {
    throw error
  }
}
