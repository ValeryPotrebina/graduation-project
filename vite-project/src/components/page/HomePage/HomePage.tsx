import { FC } from 'react'
import Content from '@/components/layout/Content/Content'
import MainLayout from '@/components/layout/MainLayout'
import Sider from '@/components/layout/Sider/Sider'
import CourseMenu from '@/components/ui/Menu/CoursesMenu/CoursesMenu'

const HomePage: FC = () => {
  return (
    <>
      <MainLayout
        sider={<Sider menu={<CourseMenu />} />}
        content={<Content />}
      />
    </>
  )
}

export default HomePage
