import { Material } from '@/types/data'
import { MenuProps } from 'antd'
import { FC } from 'react'
import MainMenu from '../MainMenu/MainMenu'
const MATERIAL_NUMBER: number = 7

type MenuItem = Required<MenuProps>['items'][number]

interface Props {
  materials: Material[]
  materialType: string
}

const CourseMaterialMenu: FC<Props> = ({ materials, materialType }) => {
  console.log('materials', materials)
  console.log('materialType', materialType)

  const items: MenuItem[] = [
    {
      key: 'lectures',
      label: 'Лекции',
      children: Array.from(Array(MATERIAL_NUMBER).keys()).map(i => ({
        key: `lecture-${i}`,
        label: `Лекция ${i + 1}`,
        children: materials
          .filter(m => m.material_type === 'Лекция' && m.number === i + 1)
          .map(m => ({
            key: `lecture-${i}-${m.content}`,
            label: m.content,
          })),
      })),
    },
    {
      key: 'seminars',
      label: 'Семинары',
      children: Array.from(Array(MATERIAL_NUMBER).keys()).map(i => ({
        key: `seminar-${i}`,
        label: `Семинар ${i + 1}`,
      })),
    },
    {
      key: 'labs',
      label: 'Лабораторные',
      children: Array.from(Array(MATERIAL_NUMBER).keys()).map(i => ({
        key: `lab-${i}`,
        label: `Лабораторная ${i + 1}`,
      })),
    },
  ]

  // TODO почему-то не работает автозакрытие меню (исправить)

  return <MainMenu items={items} defaultOpenKeys={[materialType]} />
}

export default CourseMaterialMenu
