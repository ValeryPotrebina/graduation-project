import requester from '@/lib/axios/requester'
import { Material } from '@/types/data'
import { ApiResponse } from '@/types/api'
import { MATERIALS_CREATE } from '@/constants/endpoints'

interface CreateMaterialData {
  material_type: string
  name: string
  number: number
  content: string
}

export default async function apiPostMaterial(
  courseId: number,
  materialData: CreateMaterialData
): Promise<Material> {
  const response = await requester.post<ApiResponse<Material>>(
    MATERIALS_CREATE(courseId),
    materialData
  )
  return response.data.data
}

