import styles from './Sider.module.css'
import { Layout } from 'antd'
import { FC } from 'react'
import CoursesMenu from '../../ui/Menu/CoursesMenu/CoursesMenu'

// TODO тут тоже чет не так исправить
const Sider: FC = () => {
  return (
    <>
      <Layout.Sider className={styles.sider} width="25%">
        <CoursesMenu />
      </Layout.Sider>
    </>
  )
}

export default Sider
