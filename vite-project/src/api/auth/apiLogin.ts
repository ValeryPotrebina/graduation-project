import requester from '@/lib/axios/requester'
import { AUTH_LOGIN } from '@/constants/endpoints'
import { UserData } from '@/types/data'
import { ApiResponse } from '@/types/api'

export default async function apiLogin(
  username: string,
  password: string,
): Promise<UserData> {
  try {
    const response = await requester.post<ApiResponse<UserData>>(AUTH_LOGIN, {
      username,
      password,
    })
    console.log('response', response)
    return response.data.data // Возвращаем { data: { ...userData } }
  } catch (error) {
    throw error
  }
}
