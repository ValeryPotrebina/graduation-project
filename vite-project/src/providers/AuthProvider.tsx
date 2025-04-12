import { FC, ReactNode, useEffect, useState } from 'react'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import apiCheck from '@/api/auth/apiCheck'
import useGlobalStore from '@/store/globalStore'
import apiGetCourses from '@/api/courses/apiGetCourses'
import apiGetFeaturedCourse from '@/api/users/apiGetFeaturedCourse'

interface Props {
  children: ReactNode
}

const AuthProvider: FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const { user, setUser, setCourses, setFeaturedCourses } = useGlobalStore()
  // Проверка авторизации
  useEffect(() => {
    apiCheck()
      .then(user => {
        setUser(user)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Загрузка курсов
  useEffect(() => {
    apiGetCourses().then(courses => setCourses(courses))
  }, [])

  useEffect(() => {
    if (user) {
      apiGetFeaturedCourse().then(courses => setFeaturedCourses(courses))
    }
  }, [user])

  if (loading) {
    return <LoadingSpinner loading={loading} fullScreen transparent />
  }

  return children
}

export default AuthProvider
