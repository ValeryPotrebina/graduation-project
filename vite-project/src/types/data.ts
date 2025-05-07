import { UUID } from 'crypto'

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
  hours: number
}

export interface Material {
  material_type: string
  name: string
  number: number
  content: string
  files: MaterialFile[]
}

export enum MaterialType {
  Lectures = 'lectures',
  Seminars = 'seminars',
  Labs = 'labs',
  Exams = 'exams',
}

export interface MaterialFile {
  id: UUID
  material_id: number
  file_name: string
  file_description: string
  file_url: string
}
