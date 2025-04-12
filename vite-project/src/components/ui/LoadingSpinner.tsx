import { FC } from 'react'
import { LoadingOutlined } from '@ant-design/icons'

interface Props {
  loading: boolean
  fullScreen?: boolean
  transparent?: boolean
}

// TODO: ВЫНЕСТИ В СТИЛИ
const LoadingSpinner: FC<Props> = ({
  loading,
  fullScreen = false,
  transparent = false,
}) => {
  return (
    loading && (
      <div
        style={{
          position: fullScreen ? 'fixed' : 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: `rgba(0, 0, 0, ${transparent ? 0.5 : 1})`,
        }}
      >
        <LoadingOutlined />
      </div>
    )
  )
}

export default LoadingSpinner
