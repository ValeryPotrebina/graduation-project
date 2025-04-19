import Button from '@/components/ui/Button/Button'
import { FC, useEffect, useRef } from 'react'
import styles from './AuthPage.module.css'

interface Props {
  title: string
  suptitle: string
  buttonText: string
  onSwitch: () => void
}
const Panel: FC<Props> = ({ onSwitch, title, suptitle, buttonText }) => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const current = panelRef.current
    if (!current) return
    current.getAnimations().forEach(a => a.cancel())
    current.style.opacity = '0'
    current.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 500,
      fill: 'forwards',
    })
  }, [title, suptitle, buttonText])

  return (
    <>
      <div className={styles.panelContainer} ref={panelRef}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{suptitle}</p>
        <Button text={buttonText} onClick={onSwitch} />
      </div>
    </>
  )
}

export default Panel
