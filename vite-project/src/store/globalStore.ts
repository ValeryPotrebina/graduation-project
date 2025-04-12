import { Course, UserData } from '@/types/data'
import { create } from 'zustand'
// zustant
interface IGlobalStore {
  user: UserData | undefined
  setUser: (user: UserData | undefined) => void

  featuredCourses: Course[]
  setFeaturedCourses: (courses: Course[]) => void

  courses: Course[]
  setCourses: (courses: Course[]) => void

  selectedCourse: Course | undefined
  setSelectedCourse: (course: Course | undefined) => void
}

const useGlobalStore = create<IGlobalStore>(set => ({
  user: undefined,
  setUser: user => set({ user }),

  courses: [],
  setCourses: courses => set({ courses }),

  featuredCourses: [],
  setFeaturedCourses: featuredCourses => set({ featuredCourses }),

  selectedCourse: undefined,
  setSelectedCourse: selectedCourse => set({ selectedCourse }),
}))

export default useGlobalStore
