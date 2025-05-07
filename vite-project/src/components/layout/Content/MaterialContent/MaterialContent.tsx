import { FC } from 'react'
import styles from './MaterialContent.module.css'
import { Card, Layout, List } from 'antd'
import useGlobalStore from '@/store/globalStore'
import apiDownloadFile from '@/api/materials/apiDownloadFile'

const MaterialContent: FC = () => {
  const { selectedMaterial } = useGlobalStore()

  const handleFileDownload = async (fileId: string, fileName: string) => {
    try {
      await apiDownloadFile(fileId, fileName)
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error)
    }
  }

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
        title={selectedMaterial.name}
        className={styles.card}
        style={{ width: '100%', height: '100%' }}
      >
        <p style={{ marginBottom: '25px' }}>{selectedMaterial.content}</p>
        {selectedMaterial.files && selectedMaterial.files.length > 0 ? (
          <List
            header={<div>Файлы материала</div>}
            bordered
            dataSource={selectedMaterial.files}
            renderItem={file => (
              <List.Item
                style={{ cursor: 'pointer' }}
                onClick={() => handleFileDownload(file.id, file.file_name)}
              >
                <span className={styles.fileLink}>{file.file_name}</span>
              </List.Item>
            )}
          />
        ) : (
          <div>Нет прикрепленных файлов</div>
        )}
      </Card>
    </Layout.Content>
  )
}

export default MaterialContent
