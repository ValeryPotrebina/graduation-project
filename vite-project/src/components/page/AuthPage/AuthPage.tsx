import { FC, useState } from 'react'
import AuthPanel from './AuthPanel'
import RegisterPage from '../RegisterPage/RegisterPage'
import LoginPage from '../LoginPage/LoginPage'
import styles from './AuthPage.module.css'
const AuthPage: FC = () => {
  const [isActive, setIsActive] = useState(true)

  const handleSwitch = () => {
    setIsActive(!isActive)
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.authContainer} ${isActive ? styles.login : styles.register}`}
      >
        <div className={styles.leftPanel}>
          <AuthPanel isActive={isActive} onSwitch={handleSwitch} />
        </div>

        <div className={styles.rightPanel}>
          {isActive ? <RegisterPage /> : <LoginPage />}
        </div>
      </div>
    </div>
  )
}

export default AuthPage
