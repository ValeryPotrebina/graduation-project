import { FC } from 'react'
import { MenuProps } from 'antd'
import useGlobalStore from '@/store/globalStore'
import CourseMenuItem from '@/components/ui/CoursesMenuItem/CoursesMenuItem'
import MainMenu from '../MainMenu/MainMenu'

const SEMESTER_COUNT = 8

type MenuItem = Required<MenuProps>['items'][number]

const CourseMenu: FC = () => {
  const { courses, featuredCourses } = useGlobalStore()
  // исправить
  const groupedCourses = Array.from(Array(SEMESTER_COUNT).keys()).map(i =>
    courses.filter(c => c.semester === i + 1),
  )

  const items: MenuItem[] = groupedCourses.map((courses, i) => ({
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

  return <MainMenu items={items} defaultOpenKeys={['semester-0']} />
}

export default CourseMenu
