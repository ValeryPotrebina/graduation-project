import { FC, useState } from 'react'
import { Menu, MenuProps } from 'antd'
import useGlobalStore from '@/store/globalStore'
import CourseMenuItem from '@/components/ui/CoursesMenuItem/CoursesMenuItem'

const SEMESTER_COUNT = 8

type MenuItem = Required<MenuProps>['items'][number]

interface LevelKeysProps {
  key?: string
  children?: LevelKeysProps[]
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {}
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach(item => {
      if (item.key) {
        key[item.key] = level
      }
      if (item.children) {
        func(item.children, level + 1)
      }
    })
  }
  func(items1)
  return key
}

const CourseNav: FC = () => {
  const { courses, featuredCourses } = useGlobalStore()
  // исправить
  const [stateOpenKeys, setStateOpenKeys] = useState(['semester-0'])
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

  const levelKeys = getLevelKeys(items as LevelKeysProps[])

  const onOpenChange: MenuProps['onOpenChange'] = openKeys => {
    const currentOpenKey = openKeys.find(
      key => stateOpenKeys.indexOf(key) === -1,
    )
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter(key => key !== currentOpenKey)
        .findIndex(key => levelKeys[key] === levelKeys[currentOpenKey])

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter(key => levelKeys[key] <= levelKeys[currentOpenKey]),
      )
    } else {
      setStateOpenKeys(openKeys)
    }
  }

  return (
    <Menu
      mode="inline"
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  )
}

export default CourseNav
