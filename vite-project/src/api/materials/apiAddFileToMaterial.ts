import requester from '@/lib/axios/requester'
import { MATERIALS, COURSES_LIST, FILES } from '@/constants/endpoints'
import { Material } from '@/types/data'
import { ApiResponse } from '@/types/api'

export default async function apiAddFileToMaterial(
  material_id: number,
  file: File,
  file_name?: string,
  file_description?: string,
): Promise<Material> {
  try {
    const blob = new Blob([file], { type: file.type })
    const formData = new FormData()
    formData.append('file_name', file_name ?? file.name)
    formData.append('file_description', file_description ?? '')
    formData.append('file_data', blob, file.name)

    const response = await requester.post<ApiResponse<Material>>(
      `${COURSES_LIST}${MATERIALS}/${material_id}${FILES}`,
      formData,
    )
    console.log('response files', response.data.data)
    return response.data.data
  } catch (error) {
    throw error
  }
}
