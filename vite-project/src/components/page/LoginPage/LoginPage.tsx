import { FC } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import apiLogin from '@/api/auth/apiLogin'
import { useNotificationService } from '@/providers/NotificationProvider'
import { HOME } from '@/constants/paths'
import useGlobalStore from '@/store/globalStore'
import styles from './LoginPage.module.css'
import { Container } from 'react-bootstrap'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import Button from '@/components/ui/Button/Button'

interface FormValues {
  username: string
  password: string
  isTeacher?: boolean
}
const LoginPage: FC = () => {
  const navigate = useNavigate()
  const notification = useNotificationService()
  const { setUser } = useGlobalStore()

  const handleLogin = (values: FormValues) => {
    apiLogin(values.username, values.password)
      .then(user => {
        console.log('user', user)
        if (values.isTeacher) {
          if (user.is_teacher) {
            navigate(HOME)
            setUser(user)
          } else {
            notification?.notifyError({
              message: 'Этот вход только для учителей.',
            })
          }
        } else {
          navigate(HOME)
          setUser(user)
        }
      })
      .catch(error => notification?.notifyError({ message: error.message }))
  }

  return (
    <div className={styles.container}>
      <Container className={styles.formContainer}>
        <h1 className={styles.title}>Вход</h1>
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
              placeholder="Имя пользователя"
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
              placeholder="Пароль"
            />
          </Form.Item>

          <Form.Item name="isTeacher" valuePropName="checked">
            <Checkbox>Войти как преподаватель</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button text="ВОЙТИ"></Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  )
}

export default LoginPage
