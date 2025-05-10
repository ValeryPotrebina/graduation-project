import useGlobalStore from '@/store/globalStore'
import { FC } from 'react'
import styles from './Content.module.css'
import { Layout } from 'antd'
import CourseInfo from '@/components/ui/CourseInfo/CourseInfo'
import Chat from '@/components/ui/Chat/Chat'

const Content: FC = () => {
  const { selectedCourse } = useGlobalStore()

  return (
    <Layout.Content className={styles.content}>
      <CourseInfo course={selectedCourse} />
      <Chat />
    </Layout.Content>
  )
}

export default Content
