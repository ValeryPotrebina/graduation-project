import apiGetCourseMaterials from '@/api/materials/apiGetCourseMaterials'
import MaterialContent from '@/components/layout/Content/CourseMaterialContent/MaterialContent'
import MainLayout from '@/components/layout/MainLayout'
import CourseMaterialSider from '@/components/layout/Sider/CourseMaterialSider/CourseMaterialSider'
import { useNotificationService } from '@/providers/NotificationProvider'
import useGlobalStore from '@/store/globalStore'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const CourseMaterialPage: FC = () => {
  const { courseId, materialType } = useParams<{
    courseId: string
    materialType: string
  }>()

  const { materials, setMaterials } = useGlobalStore()
  const notification = useNotificationService()

  useEffect(() => {
    if (!courseId) {
      setMaterials([])
      return
    }
    apiGetCourseMaterials(Number(courseId))
      .then(materials => {
        setMaterials(materials)
        console.log('materials', materials)
      })
      .catch(error => {
        notification?.notifyError({ message: error.message })
      })
  }, [Number(courseId)])

  return (
    <MainLayout
      sider={
        <CourseMaterialSider
          materials={materials}
          materialType={materialType || 'lectures'}
        />
      }
      content={<MaterialContent />}
    />
  )
}

export default CourseMaterialPage
