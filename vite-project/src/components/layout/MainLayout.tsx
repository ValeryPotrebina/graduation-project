import { Layout } from 'antd'
import { FC, ReactNode } from 'react'
import Header from './Header/Header'

interface Props {
  children: ReactNode
}

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <Layout>
      <Header />
      <Layout>{children}</Layout>
    </Layout>
  )
}

export default MainLayout
