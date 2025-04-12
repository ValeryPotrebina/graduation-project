import requester from '@/lib/axios/requester'
import { AUTH_CHECK } from '@/constants/endpoints'
import { UserData } from '@/types/data'
import { ApiResponse } from '@/types/api'

export default async function apiCheck(): Promise<UserData> {
  try {
    const response = await requester.post<ApiResponse<UserData>>(AUTH_CHECK)
    return response.data.data
  } catch (error) {
    throw error
  }
}
