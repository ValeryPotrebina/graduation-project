import useGlobalStore from '@/store/globalStore'
import { FC } from 'react'
import styles from './Content.module.css'
import { Layout } from 'antd'
import CourseInfo from '@/components/ui/CourseInfo/CourseInfo'
// TODO Кэширование данных
// TODO Материалы курса необходимо передавать в сайдер, так как там будет меню из материалов
// Нужен провайдер.

const Content: FC = () => {
  const { selectedCourse } = useGlobalStore()

  return (
    <Layout.Content className={styles.content}>
      <CourseInfo course={selectedCourse} />
    </Layout.Content>
  )
}

export default Content
