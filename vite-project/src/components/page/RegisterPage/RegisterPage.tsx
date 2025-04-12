import { FC, useState } from 'react'
import { Form, Input, Button, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import apiRegister from '@/api/auth/apiRegister'
import useGlobalStore from '@/store/globalStore'
import { HOME } from '@/constants/paths'
import { useNotificationService } from '@/providers/NotificationProvider'

const { Title } = Typography

interface FormValues {
  username: string
  email: string
  password: string
}
const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { setUser } = useGlobalStore()
  const notification = useNotificationService()
  const handleRegister = (values: FormValues) => {
    setLoading(true)
    apiRegister(values.username, values.password, values.email)
      .then(user => {
        navigate(HOME)
        setUser(user)
      })
      .catch(error => notification?.notifyError({ message: error.message }))
      .finally(() => setLoading(false))
  }

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <Title level={2}>Регистрация</Title>
      <Form name="register" layout="vertical" onFinish={handleRegister}>
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите имя пользователя!',
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Введите вашу почту!' },
            { type: 'email', message: 'Некорректный формат почты!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            { required: true, message: 'Введите пароль!' },
            { min: 6, message: 'Пароль должен быть не менее 6 символов' },
          ]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage
