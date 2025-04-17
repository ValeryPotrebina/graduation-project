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
          title="Welcome back!"
          suptitle="Sign in to continue"
          buttonText="SIGN IN"
        />
      ) : (
        <Panel
          onSwitch={onSwitch}
          title="Hello, Friend!"
          suptitle="Enter your personal details and start studying with us"
          buttonText="SIGN UP"
        />
      )}
    </div>
  )
}

export default AuthPanel
