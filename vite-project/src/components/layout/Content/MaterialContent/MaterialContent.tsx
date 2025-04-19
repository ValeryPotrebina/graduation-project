import { FC } from 'react'
import styles from './MaterialContent.module.css'
import { Card, Layout } from 'antd'
import useGlobalStore from '@/store/globalStore'
// TODO Кэширование данных
// TODO Материалы курса необходимо передавать в сайдер, так как там будет меню из материалов
// Нужен провайдер.
// TODO Происходит задержка с подгрузкой данных, на пару секунд тупит

const MaterialContent: FC = () => {
  const { selectedMaterial } = useGlobalStore()

  if (!selectedMaterial) {
    return (
      <Layout.Content className={styles.content}>
        <div>Выберите материал</div>
      </Layout.Content>
    )
  }

  return (
    <Layout.Content className={styles.content}>
      <Card
        title={selectedMaterial.content}
        className={styles.card}
        style={{ width: '100%', height: '100%' }}
      />
    </Layout.Content>
  )
}

export default MaterialContent
