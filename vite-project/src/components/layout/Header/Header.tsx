import { FC } from 'react'
import styles from './Header.module.css'
import { Button, Space, Layout, Select, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '@/store/globalStore'
import apiLogout from '@/api/auth/apiLogout'
import { useNotificationService } from '@/providers/NotificationProvider'
import { AUTH, HOME } from '@/constants/paths'
import Chat from '@/components/ui/Chat/Chat'
const Header: FC = () => {
  const navigate = useNavigate()
  const { courses, user, setUser } = useGlobalStore()
  const notification = useNotificationService()

  const coursesOptions = courses.map(course => ({
    value: course.id,
    label: (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{course.name}</span>
      </div>
    ),
  }))
  const handleLogout = () => {
    apiLogout()
      .then(() => {
        navigate(HOME)
        notification?.notifySuccess({
          message: 'Успех',
          description: 'Вы успешно вышли из системы.',
        })
        setUser(undefined)
      })
      .catch(error => notification?.notifyError({ message: error.message }))
  }

  const handleAuth = () => navigate(AUTH)

  const UserActions = () => {
    if (user) {
      return (
        <Space>
          <Avatar
            style={{
              backgroundColor: 'rgb(255, 255, 255)',
              color: 'rgba(0, 0, 0, 0.85)',
              marginRight: '10px',
              width: '40px',
              height: '40px',
            }}
          >
            {user.username[0].toUpperCase()}
          </Avatar>
          <Button onClick={handleLogout}>Выйти</Button>
        </Space>
      )
    }

    return (
      <Space>
        <Button onClick={handleAuth}>AUTH</Button>
      </Space>
    )
  }

  return (
    <>
      <Layout.Header className={styles.header}>
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Choose course"
          optionFilterProp="label"
          options={coursesOptions}
        />
        <Chat />
        <nav>
          <UserActions />
        </nav>
      </Layout.Header>
    </>
  )
}

export default Header
