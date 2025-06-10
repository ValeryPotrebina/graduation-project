import requester from '@/lib/axios/requester'
import { FILE_UPLOAD } from '@/constants/endpoints'
import { Material } from '@/types/data'
import { ApiResponse } from '@/types/api'

const apiPostFileToMaterial = async (
  materialId: number,
  formData: FormData,
): Promise<Material> => {
  const response = await requester.post<ApiResponse<Material>>(
    FILE_UPLOAD(materialId),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return response.data.data
}

export default apiPostFileToMaterial 