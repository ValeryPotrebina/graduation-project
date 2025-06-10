export const API_BASE_URL = '/api'

// Auth endpoints
export const AUTH_LOGIN = '/auth/login'
export const AUTH_LOGOUT = '/auth/logout'
export const AUTH_REGISTER = '/auth/register'
export const AUTH_CHECK = '/auth/check_authorization'

// Courses endpoints
export const COURSES_LIST = '/courses'
export const COURSES_CREATE = '/courses/'

// Users endpoints
export const USERS_FEATURED_COURSES = '/users/featured_courses'

// Materials endpoints
export const MATERIALS = '/materials'
export const MATERIALS_CREATE = (courseId: number) =>
  `/courses/${courseId}/materials`
export const MATERIALS_BY_COURSE = (courseId: number) => `/courses/${courseId}/materials`
export const FILE_UPLOAD = (materialId: number) => `/courses/materials/${materialId}/files`
export const FILES = '/files'

// OpenAI endpoints
export const OPENAI_ASK = '/ask_openai/'
