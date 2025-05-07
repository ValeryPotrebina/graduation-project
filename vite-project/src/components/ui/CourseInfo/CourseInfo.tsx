import { Course } from '@/types/data'
import { FC } from 'react'
import { COURSE_MATERIALS } from '@/constants/paths'

import { Card, Descriptions, Typography, Space, Divider, Row } from 'antd'

const { Title, Paragraph } = Typography
import styles from './CourseInfo.module.css'
import MaterialButton from '../MaterialButton/MaterialButton'
import { useNavigate } from 'react-router-dom'
import { MaterialType } from '@/types/data'
interface Props {
  course: Course | undefined
}

const CourseInfo: FC<Props> = ({ course }) => {
  const navigate = useNavigate()

  const handleClick = (materialType: string) =>
    navigate(`${COURSE_MATERIALS}/${course?.id}/${materialType}`)

  if (!course) {
    return (
      <Card>
        <Title level={4}>Курс не выбран</Title>
        <Paragraph type="secondary">
          Пожалуйста, выберите курс из списка
        </Paragraph>
      </Card>
    )
  }

  return (
    <>
      <Card className={styles.courseInfoCard}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Title level={3}>{course.name}</Title>

          <Descriptions size="small" column={1}>
            <Descriptions.Item label="Семестр">
              <span className={styles.semester}>{course.semester}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Количество часов">
              <span>{course.hours}</span>
            </Descriptions.Item>
            <Descriptions.Item label="Преподаватель">
              <span>{course.teacher}</span>
            </Descriptions.Item>
            <Divider orientation="left">Описание курса</Divider>
            <Paragraph style={{ whiteSpace: 'pre-line' }}>
              {course.description}
            </Paragraph>
          </Descriptions>
        </Space>
      </Card>

      <Divider />

      <Row>
        <MaterialButton
          materialType="Лекции"
          onClick={() => handleClick(MaterialType.Lectures)}
        />
        <Space />
        <MaterialButton
          materialType="Семинары"
          onClick={() => handleClick(MaterialType.Seminars)}
        />
        <MaterialButton
          materialType="Лабы"
          onClick={() => handleClick(MaterialType.Labs)}
        />
      </Row>
    </>
  )
}

export default CourseInfo
