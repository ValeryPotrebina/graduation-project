import Button from '@/components/ui/Button/Button'
import { FC } from 'react'
import styles from './AuthPage.module.css'

interface Props {
  title: string
  suptitle: string
  buttonText: string
  onSwitch: () => void
}
const Panel: FC<Props> = ({ onSwitch, title, suptitle, buttonText }) => {
  return (
    <>
      <div className={styles.panelContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{suptitle}</p>
        <Button text={buttonText} onClick={onSwitch} />
      </div>
    </>
  )
}

export default Panel
