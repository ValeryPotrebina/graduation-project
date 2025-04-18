import MaterialContent from '@/components/layout/Content/CourseMaterialContent/MaterialContent'
import MainLayout from '@/components/layout/MainLayout'
import Sider from '@/components/layout/Sider/Sider'
import MaterialMenu from '@/components/ui/Menu/MaterialMenu/MaterialMenu'
import { FC } from 'react'

const MaterialPage: FC = () => {
  return (
    <MainLayout
      sider={<Sider menu={<MaterialMenu />} />}
      content={<MaterialContent />}
    />
  )
}

export default MaterialPage
