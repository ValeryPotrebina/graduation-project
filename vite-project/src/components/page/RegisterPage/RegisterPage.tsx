import { FC } from 'react'
import { Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import apiRegister from '@/api/auth/apiRegister'
import useGlobalStore from '@/store/globalStore'
import { HOME } from '@/constants/paths'
import { useNotificationService } from '@/providers/NotificationProvider'
import styles from './RegisterPage.module.css'
import { Container } from 'react-bootstrap'
import Button from '@/components/ui/Button/Button'
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'

interface FormValues {
  username: string
  email: string
  password: string
}

const RegisterPage: FC = () => {
  const navigate = useNavigate()
  const { setUser } = useGlobalStore()
  const notification = useNotificationService()
  const handleRegister = (values: FormValues) => {
    apiRegister(values.username, values.email, values.password)
      .then(user => {
        navigate(HOME)
        setUser(user)
      })
      .catch(error => notification?.notifyError({ message: error.message }))
  }

  return (
    <div className={styles.container}>
      <Container className={styles.formContainer}>
        <h1 className={styles.title}> Registration</h1>
        <Form
          className={styles.form}
          name="register"
          layout="vertical"
          onFinish={handleRegister}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите имя пользователя!',
              },
            ]}
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
            name="email"
            rules={[
              { required: true, message: 'Введите вашу почту!' },
              { type: 'email', message: 'Некорректный формат почты!' },
            ]}
          >
            <Input
              style={{
                borderRadius: '0px',
              }}
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            className={styles.formField}
            name="password"
            rules={[
              { required: true, message: 'Введите пароль!' },
              { min: 6, message: 'Пароль должен быть не менее 6 символов' },
            ]}
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
            <Button text="SIGN UP"></Button>
          </Form.Item>
        </Form>
      </Container>
    </div>
  )
}

export default RegisterPage
