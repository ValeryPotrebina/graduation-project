import { FC, useState } from 'react'
import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import apiLogin from '@/api/auth/apiLogin'
import { useNotificationService } from '@/providers/NotificationProvider'
import { HOME } from '@/constants/paths'
import useGlobalStore from '@/store/globalStore'
import styles from './LoginPage.module.css'
import { Container } from 'react-bootstrap'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Button from '@/components/ui/Button/Button'
// TODO Logout не обновляется автоматически

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
    <div className={styles.container}>
      <Container className={styles.formContainer}>
        <h1 className={styles.title}>Log in</h1>
        <Form
          name="login"
          className={styles.form}
          layout="vertical"
          onFinish={handleLogin}
        >
          <Form.Item
            className={styles.formField}
            name="username"
            // rules={[{ required: true, message: 'Введите имя пользователя!' }]}
          >
            <Input
              style={{
                borderRadius: '0px',
              }}
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            className={styles.formField}
            name="password"
            // rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input
              style={{
                borderRadius: '0px',
              }}
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button text="SIGN IN"></Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  )
}

export default LoginPage
