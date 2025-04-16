import requester from '@/lib/axios/requester'
import { AUTH_REGISTER } from '@/constants/endpoints'
import { UserData } from '@/types/data'
import { ApiResponse } from '@/types/api'

export default async function apiRegister(
  username: string,
  email: string,
  password: string,
): Promise<UserData> {
  try {
    const response = await requester.post<ApiResponse<UserData>>(
      AUTH_REGISTER,
      {
        username,
        email,
        password,
      },
    )
    console.log('response register', response)
    return response.data.data // Возвращаем { data: { ...userData } }
  } catch (error) {
    throw error
  }
}
