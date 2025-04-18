import { Material } from '@/types/data'
import { MenuProps } from 'antd'
import { FC } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import MaterialItem from '../../MaterialItem'

type MenuItem = Required<MenuProps>['items'][number]

interface Props {
  materials: Material[]
  materialType: string
}

// разделить материалы по лекциям и семинарам, а также по их номерам

const MaterialMenu: FC<Props> = ({ materials, materialType }) => {
  const getMaterialNumbers = (type: string) => {
    const numbers = materials
      .filter(m => m.material_type === type)
      .map(m => m.number)
    return [...new Set(numbers)].sort((a, b) => a - b)
  }

  // Функция для создания пунктов меню
  const createMenuItems = (type: string, prefix: string) => {
    const numbers = getMaterialNumbers(type)
    return numbers.map(number => ({
      key: `${prefix}-${number}`,
      label: `${type} ${number}`,
      children: materials
        .filter(m => m.material_type === type && m.number === number)
        .map(m => ({
          key: `${prefix}-${number}-${m.content}`,
          label: <MaterialItem material={m} />,
        })),
    }))
  }

  const items: MenuItem[] = [
    {
      key: 'lectures',
      label: 'Лекции',
      children: createMenuItems('Лекция', 'lecture'),
    },
    {
      key: 'seminars',
      label: 'Семинары',
      children: createMenuItems('Семинар', 'seminar'),
    },
    {
      key: 'labs',
      label: 'Лабораторные',
      children: createMenuItems('Лабораторная', 'lab'),
    },
  ]

  // TODO почему-то не работает автозакрытие меню (исправить)

  return <MainMenu items={items} defaultOpenKeys={[materialType]} />
}

export default MaterialMenu
