import { Course } from '@/types/data'
import { FC, MouseEvent } from 'react'
import useGlobalStore from '@/store/globalStore'
import { useNotificationService } from '@/providers/NotificationProvider'
import FeaturedStar from '../FeaturedStar/FeaturedStar'
import apiAddFeaturedCourse from '@/api/users/apiAddFeaturedCourse'
import apiRemoveFeaturedCourse from '@/api/users/apiRemoveFeaturedCourse'
import apiGetFeaturedCourse from '@/api/users/apiGetFeaturedCourse'

interface Props {
  course: Course
  isFeatured: boolean
}

const CourseMenuItem: FC<Props> = ({ course, isFeatured }) => {
  const notification = useNotificationService()
  const { user, setSelectedCourse, setFeaturedCourses } = useGlobalStore()

  const toggleFeatured = () => {
    if (!user) {
      notification?.notifyWarning({
        message: 'Предупреждение',
        description: 'Вы должны быть авторизованы, чтобы добавить в избранное.',
      })
      return
    }
    const apiFunc = isFeatured ? apiRemoveFeaturedCourse : apiAddFeaturedCourse
    apiFunc(course.id)
      .then(() => {
        notification?.notifySuccess({
          message: 'Успех',
          description: isFeatured
            ? 'Курс успешно удален из избранных.'
            : 'Курс успешно добавлен в избранные.',
        })
        apiGetFeaturedCourse()
          .then(courses => {
            setFeaturedCourses(courses)
          })
          .catch(error => {
            notification?.notifyError({
              message: error.message,
              description: 'Произошла ошибка при получении избранных курсов.',
            })
          })
      })
      .catch(error =>
        notification?.notifyError({
          message: 'Ошибка',
          description:
            error.response?.status === 401
              ? 'Вы должны быть авторизованы, чтобы добавить в избранное.'
              : 'Произошла ошибка при добавлении в избранное.',
        }),
      )
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onClick={() => setSelectedCourse(course)}
    >
      {course.name}
      <FeaturedStar
        active={isFeatured}
        onClick={(e: MouseEvent) => {
          e.stopPropagation()
          toggleFeatured()
        }}
      />
    </div>
  )
}

export default CourseMenuItem
