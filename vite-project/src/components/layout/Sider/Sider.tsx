import { FC, ReactNode } from 'react'
import { Layout } from 'antd'
import styles from './Sider.module.css'

interface Props {
  menu: ReactNode
}

const Sider: FC<Props> = ({ menu }) => {
  return (
    <Layout.Sider width="25%" className={styles.sider}>
      {menu}
    </Layout.Sider>
  )
}

export default Sider
