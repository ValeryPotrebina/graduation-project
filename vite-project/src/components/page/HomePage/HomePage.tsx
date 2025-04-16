import { FC } from 'react'
import Content from '@/components/layout/Content/Content'
import Sider from '@/components/layout/Sider/Sider'
import MainLayout from '@/components/layout/MainLayout'

const HomePage: FC = () => {
  return (
    <>
      <MainLayout sider={<Sider />} content={<Content />} />
    </>
  )
}

export default HomePage
