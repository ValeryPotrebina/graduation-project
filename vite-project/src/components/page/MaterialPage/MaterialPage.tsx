import MaterialContent from '@/components/layout/Content/MaterialContent/MaterialContent'
import MainLayout from '@/components/layout/MainLayout'
import Sider from '@/components/layout/Sider/Sider'
import MaterialMenu from '@/components/ui/Menu/MaterialMenu/MaterialMenu'
import { FC } from 'react'

const MaterialPage: FC = () => {
  return (
    <MainLayout>
      <Sider>
        <MaterialMenu />
      </Sider>
      <MaterialContent />
    </MainLayout>
  )
}

export default MaterialPage
