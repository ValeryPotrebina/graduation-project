import requester from '@/lib/axios/requester'
import { AUTH_LOGOUT } from '@/constants/endpoints'

export default async function apiLogin(): Promise<void> {
  try {
    await requester.post(AUTH_LOGOUT)
    return
  } catch (error) {
    throw error
  }
}
