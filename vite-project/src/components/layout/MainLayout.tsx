import { Layout } from 'antd'
import { FC, ReactNode } from 'react'
import Header from './Header/Header'

interface Props {
  sider: ReactNode
  content: ReactNode
}

const MainLayout: FC<Props> = ({ sider, content }) => {
  return (
    <Layout>
      <Header />
      <Layout>
        {sider}
        {content}
      </Layout>
    </Layout>
  )
}

export default MainLayout
