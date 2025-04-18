import { MenuProps } from 'antd'
import { FC, useEffect } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import MaterialItem from '../../MaterialItem'
import { useParams } from 'react-router-dom'
import useGlobalStore from '@/store/globalStore'
import { useNotificationService } from '@/providers/NotificationProvider'
import apiGetCourseMaterials from '@/api/materials/apiGetCourseMaterials'

type MenuItem = Required<MenuProps>['items'][number]
// разделить материалы по лекциям и семинарам, а также по их номерам

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

  return (
    <MainMenu items={items} defaultOpenKeys={[materialType || 'lectures']} />
  )
}

export default MaterialMenu
