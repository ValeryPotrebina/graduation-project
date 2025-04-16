import { Button } from 'antd'
import { FC, MouseEventHandler } from 'react'

interface Props {
  materialType: string
  onClick: MouseEventHandler
}

const MaterialButton: FC<Props> = ({ materialType, onClick }) => {
  return (
    <Button
      style={{ width: '100%', marginBottom: '10px' }}
      type="primary"
      block
      onClick={onClick}
    >
      {materialType}
    </Button>
  )
}

export default MaterialButton
