import { FC } from 'react'
import style from './Button.module.css'
interface Props {
  text: string
  onClick?: () => void
}

const Button: FC<Props> = ({ text, onClick }) => {
  return (
    <button className={style.button} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
