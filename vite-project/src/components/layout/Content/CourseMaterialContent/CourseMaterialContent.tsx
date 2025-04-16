import { FC } from 'react'
import styles from './CourseMaterialContent.module.css'
import { Layout } from 'antd'
// TODO Кэширование данных
// TODO Материалы курса необходимо передавать в сайдер, так как там будет меню из материалов
// Нужен провайдер.

const CourseMaterialContent: FC = () => {
  return (
    <Layout.Content className={styles.content}>
      <div>MATERIAL CONTENT</div>
    </Layout.Content>
  )
}

export default CourseMaterialContent
