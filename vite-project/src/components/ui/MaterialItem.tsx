import useGlobalStore from '@/store/globalStore'
import { Material } from '@/types/data'
import { FC } from 'react'

interface Props {
  material: Material
}

const MaterialItem: FC<Props> = ({ material }) => {
  const { setSelectedMaterial } = useGlobalStore()
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => {
        console.log('selected material', material)
        setSelectedMaterial(material)
      }}
    >
      {material.content}
    </div>
  )
}

export default MaterialItem
