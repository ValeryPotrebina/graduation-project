import { FC, ReactNode, useState } from 'react'
import { Layout } from 'antd'
import styles from './Sider.module.css'
interface Props {
  children: ReactNode
}

const Sider: FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout.Sider
      width="20%"
      collapsible
      collapsed={collapsed}
      className={styles.sider}
      trigger={null}
      onDoubleClick={toggleCollapsed}
    >
      {children}
    </Layout.Sider>
  )
}

export default Sider
