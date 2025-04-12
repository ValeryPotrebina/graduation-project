import requester from '@/lib/axios/requester'
import { USERS_FEATURED_COURSES } from '@/constants/endpoints'

export default async function apiAddFeaturedCourse(courseId: number) {
  try {
    await requester.post(`${USERS_FEATURED_COURSES}/${courseId}`)
    return
  } catch (error) {
    throw error
  }
}
