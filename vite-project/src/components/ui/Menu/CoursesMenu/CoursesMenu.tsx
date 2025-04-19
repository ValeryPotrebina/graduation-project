import { FC } from 'react'
import { Menu, MenuProps } from 'antd'
import useGlobalStore from '@/store/globalStore'
import CourseMenuItem from '@/components/ui/CoursesMenuItem/CoursesMenuItem'
import MainMenu from '../MainMenu/MainMenu'
import Icon, { HeartFilled } from '@ant-design/icons'

const SEMESTER_COUNT = 8

type MenuItem = Required<MenuProps>['items'][number]

const CourseMenu: FC = () => {
  const { courses, featuredCourses, user } = useGlobalStore()

  const groupedCourses = Array.from(Array(SEMESTER_COUNT).keys()).map(i =>
    courses.filter(c => c.semester === i + 1),
  )

  // Элементы основного меню (по семестрам)
  const semesterItems: MenuItem[] = groupedCourses.map((courses, i) => ({
    key: `semester-${i}`,
    label: `Семестр ${i + 1}`,
    children: courses.map(course => ({
      key: `course-${course.id}`,
      label: (
        <CourseMenuItem
          course={course}
          isFeatured={!!featuredCourses.find(f => f.id === course.id)}
        />
      ),
    })),
  }))

  // Элементы меню избранных курсов
  const favoriteItems: MenuItem[] = [
    {
      key: 'favorites',
      icon: <HeartFilled style={{ color: '#ff4d4f' }} />,
      label: 'Избранные курсы',
      children: featuredCourses.map(course => ({
        key: `fav-course-${course.id}`,
        label: <CourseMenuItem course={course} isFeatured={true} />,
      })),
    },
  ]

  return (
    <>
      {user && (
        <Menu
          mode="inline"
          items={favoriteItems}
          defaultOpenKeys={['favorites']}
        />
      )}

      <MainMenu items={semesterItems} defaultOpenKeys={['semester-0']} />
    </>
  )
}

export default CourseMenu
