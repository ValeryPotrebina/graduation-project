import { Course, Material, UserData } from '@/types/data'
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

  materials: Material[]
  setMaterials: (materials: Material[]) => void

  selectedMaterial: Material | undefined
  setSelectedMaterial: (material: Material | undefined) => void

  isTeacher: () => boolean
}

const useGlobalStore = create<IGlobalStore>((set, get) => ({
  user: undefined,
  setUser: user => set({ user }),

  courses: [],
  setCourses: courses => set({ courses }),

  featuredCourses: [],
  setFeaturedCourses: featuredCourses => set({ featuredCourses }),

  selectedCourse: undefined,
  setSelectedCourse: selectedCourse => set({ selectedCourse }),

  materials: [],
  setMaterials: materials => set({ materials }),

  selectedMaterial: undefined,
  setSelectedMaterial: selectedMaterial => set({ selectedMaterial }),

  isTeacher: () => {
    const user = get().user
    return user ? !!user.is_teacher : false
  },
}))

export default useGlobalStore
