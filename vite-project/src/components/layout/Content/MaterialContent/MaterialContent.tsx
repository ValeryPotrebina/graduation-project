import { FC } from 'react'
import { Card, Layout, List } from 'antd'
import { FileOutlined } from '@ant-design/icons'
import useGlobalStore from '@/store/globalStore'
import styles from './MaterialContent.module.css'
import Chat from '@/components/ui/Chat/Chat'

const MaterialContent: FC = () => {
  const { selectedMaterial } = useGlobalStore()

  // const [loadingFiles, setLoadingFiles] = useState<Record<string, boolean>>({})

  // const handleFileDownload = async (file: MaterialFile) => {
  //   setLoadingFiles(prev => ({ ...prev, [file.id]: true }))

  //   try {
  //     await apiDownloadFile(file.file_url, file.file_name)
  //   } catch (error) {
  //     console.error('Ошибка при скачивании файла:', error)
  //   } finally {
  //     // По завершении или при ошибке убираем флажок "загружается"
  //     setLoadingFiles(prev => ({ ...prev, [file.id]: false }))
  //   }
  // }

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
              // const isLoading = !!loadingFiles[file.id]

              return (
                <List.Item className={styles.fileItem}>
                  <div className={styles.fileInfo}>
                    <FileOutlined className={styles.fileIcon} />

                    <a
                      href={`http://localhost:8000${file.file_url}`}
                      download={file.file_name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.fileLink}
                    >
                      {file.file_name}
                    </a>

                    {/* Если файл загружается, показываем индикатор Spin */}
                    {/* {isLoading && (
                     <Spin size="small" className={styles.spinner} />
                    )} */}
                  </div>
                </List.Item>
              )
            }}
          />
        ) : (
          <div>Нет прикрепленных файлов</div>
        )}
      </Card>
      <Chat />
    </Layout.Content>
  )
}

export default MaterialContent
