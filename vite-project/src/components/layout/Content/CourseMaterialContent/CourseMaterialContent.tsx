import { FC } from 'react'
import styles from './CourseMaterialContent.module.css'
import { Layout } from 'antd'
import useGlobalStore from '@/store/globalStore'
// TODO Кэширование данных
// TODO Материалы курса необходимо передавать в сайдер, так как там будет меню из материалов
// Нужен провайдер.
// TODO Происходит задержка с подгрузкой данных, на пару секунд тупит

const CourseMaterialContent: FC = () => {
  const { materials } = useGlobalStore()
  return (
    <Layout.Content className={styles.content}>
      {materials.map(m => (
        <div>{m.url}</div>
      ))}
    </Layout.Content>
  )
}

export default CourseMaterialContent
