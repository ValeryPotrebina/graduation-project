export interface UserData {
  username: string
  email: string
}

export interface Course {
  id: number
  name: string
  description: string
  semester: number
  teacher: string
}

export interface Material {
  material_type: string
  number: number
  content: string
  url: string
}

export enum MaterialType {
  Lectures = 'lectures',
  Seminars = 'seminars',
  Labs = 'labs',
  Exams = 'exams',
}
