import { Material } from '@/types/data'
import styles from './CourseMaterialSider.module.css'
import { Layout } from 'antd'
import { FC } from 'react'
import CourseMaterialMenu from '@/components/ui/Menu/CourseMaterialMenu/CourseMaterialMenu'

interface Props {
  materials: Material[]
  materialType: string
}
const CourseMaterialSider: FC<Props> = ({ materials, materialType }) => {
  return (
    <>
      <Layout.Sider className={styles.sider} width="25%">
        <CourseMaterialMenu materials={materials} materialType={materialType} />
      </Layout.Sider>
    </>
  )
}

export default CourseMaterialSider
