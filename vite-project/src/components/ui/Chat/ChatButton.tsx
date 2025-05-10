import { FC } from 'react'
import styles from './ChatButton.module.css'

interface Props {
  text: string
  onClick?: () => void
}

const ChatButton: FC<Props> = ({ text, onClick }) => {
  return (
    <button className={styles.chatButton} onClick={onClick}>
      {text}
    </button>
  )
}

export default ChatButton
