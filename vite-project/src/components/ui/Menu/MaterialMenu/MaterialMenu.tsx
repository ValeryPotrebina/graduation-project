import { MenuProps } from 'antd'
import { FC, useEffect } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import MaterialItem from '../../MaterialItem'
import { useParams } from 'react-router-dom'
import useGlobalStore from '@/store/globalStore'
import { useNotificationService } from '@/providers/NotificationProvider'
import apiGetCourseMaterials from '@/api/materials/apiGetCourseMaterials'
import { MaterialType } from '@/types/data'

type MenuItem = Required<MenuProps>['items'][number]

const MaterialMenu: FC = () => {
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

  const getMaterialNumbers = (type: string) => {
    const numbers = materials
      .filter(m => m.material_type === type)
      .map(m => m.number)
    return [...new Set(numbers)].sort((a, b) => a - b)
  }

  // Функция для создания пунктов меню
  const createMenuItems = (type: string, prefix: string) => {
    const numbers = getMaterialNumbers(type)
    return materials
      .filter(m => m.material_type === type && numbers.includes(m.number))
      .map(m => ({
        key: `${prefix}-${m.number}-${m.content}`,
        label: <MaterialItem material={m} />,
      }))
  }

  const items: MenuItem[] = [
    {
      key: MaterialType.Lectures,
      label: 'Лекции',
      // ПОМЕНЯТЬ БЛЯТЬ НА ЕНУМЫ ТУТ И НА БЭКЕ
      children: createMenuItems(MaterialType.Lectures, 'lecture'),
    },
    {
      key: MaterialType.Seminars,
      label: 'Семинары',
      children: createMenuItems(MaterialType.Seminars, 'seminar'),
    },
    {
      key: MaterialType.Labs,
      label: 'Лабораторные',
      children: createMenuItems(MaterialType.Labs, 'lab'),
    },
  ]

  return (
    <MainMenu
      items={items}
      defaultOpenKeys={[materialType || MaterialType.Lectures]}
    />
  )
}

export default MaterialMenu
