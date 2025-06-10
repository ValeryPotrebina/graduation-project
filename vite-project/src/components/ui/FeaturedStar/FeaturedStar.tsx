import { FC, MouseEventHandler } from 'react'
import { StarFilled, StarOutlined } from '@ant-design/icons'

interface Props {
  active: boolean
  onClick: MouseEventHandler
}

const FeaturedStar: FC<Props> = ({ active, onClick }) => {
  const Icon = active ? StarFilled : StarOutlined
  const color = active ? 'gold' : '#999'

  return (
    <Icon
      style={{
        color,
        marginLeft: '0.5rem',
        fontSize: '16px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  )
}

export default FeaturedStar
