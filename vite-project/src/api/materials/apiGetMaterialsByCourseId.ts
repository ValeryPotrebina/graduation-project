import requester from '@/lib/axios/requester'
import { MATERIALS_BY_COURSE } from '@/constants/endpoints'
import { Material } from '@/types/data'
import { ApiResponse } from '@/types/api'

const apiGetMaterialsByCourseId = async (courseId: number): Promise<Material[]> => {
  const response = await requester.get<ApiResponse<Material[]>>(
    MATERIALS_BY_COURSE(courseId),
  )
  return response.data.data
}

export default apiGetMaterialsByCourseId 