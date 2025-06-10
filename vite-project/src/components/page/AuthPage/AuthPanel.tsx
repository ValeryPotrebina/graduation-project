import { FC } from 'react'
import styles from './AuthPage.module.css'
import Panel from './Panel'
interface Props {
  isActive: boolean
  onSwitch: () => void
}

const AuthPanel: FC<Props> = ({ isActive, onSwitch }) => {
  return (
    <div
      className={`${styles.panelContent} ${isActive ? styles.loginContent : styles.registerContent}`}
    >
      {isActive ? (
        <Panel
          onSwitch={onSwitch}
          title="Добро пожаловать!"
          suptitle="Войдите, чтобы продолжить"
          buttonText="ВОЙТИ"
        />
      ) : (
        <Panel
          onSwitch={onSwitch}
          title="Привет!"
          suptitle="Введите свои личные данные и начните учиться вместе с нами"
          buttonText="ЗАРЕГИСТРИРОВАТЬСЯ"
        />
      )}
    </div>
  )
}

export default AuthPanel
