import useGlobalStore from '@/store/globalStore'
import { FC } from 'react'

const Content: FC = () => {
  const { selectedCourse } = useGlobalStore()
  return (
    <div className="content">
      <h1>{selectedCourse?.name}</h1>
      <p>{selectedCourse?.description}</p>
    </div>
  )
}

export default Content
