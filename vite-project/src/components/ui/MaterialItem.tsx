import useGlobalStore from '@/store/globalStore'
import { Material, MaterialType } from '@/types/data'
import { FC } from 'react'

interface Props {
  material: Material
}

const MaterialItem: FC<Props> = ({ material }) => {
  const type = (materialType: string) => {
    switch (materialType) {
      case MaterialType.Lectures:
        return 'Лекция'
      case MaterialType.Seminars:
        return 'Семинар'
      case MaterialType.Labs:
        return 'Лаба'
      default:
        return 'Default'
    }
  }
  const { setSelectedMaterial } = useGlobalStore()
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => {
        console.log('selected material', material)
        setSelectedMaterial(material)
      }}
    >
      {type(material.material_type)} {material.number} - {material.name}
    </div>
  )
}

export default MaterialItem
