import { FC, useState } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import apiLogin from '@/api/auth/apiLogin'
import { useNotificationService } from '@/providers/NotificationProvider'
import { HOME } from '@/constants/paths'
import useGlobalStore from '@/store/globalStore'

const { Title } = Typography

interface FormValues {
  username: string
  password: string
}

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const notification = useNotificationService()
  const [loading, setLoading] = useState(false)
  const { setUser } = useGlobalStore()

  const handleLogin = (values: FormValues) => {
    setLoading(true)
    apiLogin(values.username, values.password)
      .then(user => {
        navigate(HOME)
        setUser(user)
      })
      .catch(error => notification?.notifyError({ message: error.message }))
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>Вход</Title>
      <Form name="login" layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
