import { FC } from 'react'
import styles from './Header.module.css'
import { Button, Space, Layout, Select, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import useGlobalStore from '@/store/globalStore'
import apiLogout from '@/api/auth/apiLogout'
import { useNotificationService } from '@/providers/NotificationProvider'
import { HOME, LOGIN, REGISTER } from '@/constants/paths'
const Header: FC = () => {
  const navigate = useNavigate()
  const { courses, user } = useGlobalStore()
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
      .then(() => navigate(HOME))
      .catch(error => notification?.notifyError({ message: error.message }))
  }

  const handleRegister = () => navigate(REGISTER)
  const handleLogin = () => navigate(LOGIN)

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
        <Button onClick={handleRegister}>Регистрация</Button>
        <Button onClick={handleLogin}>Войти</Button>
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
        <nav>
          <UserActions />
        </nav>
      </Layout.Header>
    </>
  )
}

export default Header
