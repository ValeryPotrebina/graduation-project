import { FC, useState } from 'react'
import { Card, Layout, List, Spin } from 'antd'
import { FileOutlined } from '@ant-design/icons'
import useGlobalStore from '@/store/globalStore'
import apiDownloadFile from '@/api/materials/apiDownloadFile'
import styles from './MaterialContent.module.css'

const MaterialContent: FC = () => {
  const { selectedMaterial } = useGlobalStore()

  // Храним состояние загрузки для каждого файла в виде объекта:
  // ключ — это ID файла, значение — булево (true/false).
  const [loadingFiles, setLoadingFiles] = useState<Record<string, boolean>>({})

  const handleFileDownload = async (fileId: string, fileName: string) => {
    // Перед началом скачивания ставим флажок "загружается"
    setLoadingFiles(prev => ({ ...prev, [fileId]: true }))

    try {
      await apiDownloadFile(fileId, fileName)
    } catch (error) {
      console.error('Ошибка при скачивании файла:', error)
    } finally {
      // По завершении или при ошибке убираем флажок "загружается"
      setLoadingFiles(prev => ({ ...prev, [fileId]: false }))
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
            style={{ marginTop: '25px' }}
            header={<div className={styles.filesHeader}>Файлы материала</div>}
            bordered
            dataSource={selectedMaterial.files}
            renderItem={file => {
              const isLoading = !!loadingFiles[file.id]

              return (
                <List.Item className={styles.fileItem}>
                  <div className={styles.fileInfo}>
                    <FileOutlined className={styles.fileIcon} />

                    {/* При клике запускаем загрузку */}
                    <span
                      className={styles.fileLink}
                      onClick={() =>
                        handleFileDownload(file.id, file.file_name)
                      }
                    >
                      {file.file_name}
                    </span>

                    {/* Если файл загружается, показываем индикатор Spin */}
                    {isLoading && (
                      <Spin size="small" className={styles.spinner} />
                    )}
                  </div>
                </List.Item>
              )
            }}
          />
        ) : (
          <div>Нет прикрепленных файлов</div>
        )}
      </Card>
    </Layout.Content>
  )
}

export default MaterialContent
