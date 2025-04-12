import { FC } from 'react'
import { Layout } from 'antd'
import Header from '@/components/layout/Header/Header'
import CoursesMenu from '@/components/layout/CoursesMenu/CoursesMenu'
import Content from '@/components/layout/Content/Content'

const HomePage: FC = () => {
  return (
    <>
      <Layout>
        <Header />
        <Layout>
          <CoursesMenu />
          <Content />
        </Layout>
      </Layout>
    </>
  )
}

export default HomePage
