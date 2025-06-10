import { FC, useEffect, useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Typography,
  InputNumber,
  Tabs,
} from 'antd'
import {
  UploadOutlined,
  BookOutlined,
  FileAddOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import styles from './ExtraServicesPage.module.css'
import useGlobalStore from '@/store/globalStore'
import { useNotificationService } from '@/providers/NotificationProvider'
import apiPostCourse from '@/api/courses/apiPostCourses'
import { Material, MaterialType } from '@/types/data'
import apiPostMaterial from '@/api/materials/apiPostMaterial'
import apiGetMaterialsByCourseId from '@/api/materials/apiGetMaterialsByCourseId'
import apiPostFileToMaterial from '@/api/materials/apiPostFileToMaterial'

const { Title } = Typography
const { Option } = Select
const { TabPane } = Tabs

const materialTypeTranslations: Record<MaterialType, string> = {
  [MaterialType.Lectures]: 'Лекция',
  [MaterialType.Seminars]: 'Семинар',
  [MaterialType.Labs]: 'Лабораторная работа',
  [MaterialType.Exams]: 'Экзамен',
}

const ExtraServicesPage: FC = () => {
  const [courseForm] = Form.useForm()
  const [materialForm] = Form.useForm()
  const [fileForm] = Form.useForm()
  const [materialsLoading, setMaterialsLoading] = useState(false)
  const { user, courses, materials, setMaterials } = useGlobalStore()
  const notification = useNotificationService()

  useEffect(() => {
    if (user) {
      courseForm.setFieldsValue({ teacher: user.username })
    }
  }, [user, courseForm])

  const onFinishCourse = async (values: any) => {
    if (!user) {
      notification?.notifyError({ message: 'Пользователь не авторизован' })
      return
    }

    try {
      const courseData = {
        ...values,
        teacher: user.username,
      }
      await apiPostCourse(courseData)
      notification?.notifySuccess({ message: 'Успешно добавлен курс' })
      courseForm.resetFields()
    } catch (error: any) {
      notification?.notifyError({
        message: 'Возникла ошибка при добавлении курса',
        description: error.message,
      })
    }
  }

  const onFinishMaterial = async (values: any) => {
    try {
      const { courseId, ...materialData } = values
      await apiPostMaterial(courseId, materialData)
      notification?.notifySuccess({ message: 'Материал успешно добавлен' })
      materialForm.resetFields()
    } catch (error: any) {
      notification?.notifyError({
        message: 'Не удалось добавить материал',
        description: error.message,
      })
    }
  }

  const onFinishFile = async (values: any) => {
    const { selectMaterialForFile: materialId, file_name, file_description, file } = values

    if (!file || file.length === 0) {
      notification?.notifyError({ message: 'Пожалуйста, выберите файл для загрузки' })
      return
    }

    const formData = new FormData()
    const uploadedFile = file[0].originFileObj
    formData.append('file', uploadedFile)
    formData.append('file_name', file_name)
    if (file_description) {
      formData.append('file_description', file_description)
    }

    try {
      await apiPostFileToMaterial(materialId, formData)
      notification?.notifySuccess({ message: 'Файл успешно добавлен к материалу' })
      fileForm.resetFields()
      setMaterials([])
    } catch (error: any) {
      notification?.notifyError({
        message: 'Не удалось добавить файл',
        description: error.message,
      })
    }
  }

  const handleCourseChange = async (courseId: number) => {
    if (!courseId) {
      setMaterials([])
      return
    }
    try {
      setMaterialsLoading(true)
      const fetchedMaterials = await apiGetMaterialsByCourseId(courseId)
      setMaterials(fetchedMaterials)
      fileForm.setFieldsValue({ selectMaterialForFile: undefined, file: undefined })
    } catch (error: any) {
      notification?.notifyError({
        message: 'Не удалось загрузить материалы',
        description: error.message,
      })
      setMaterials([])
    } finally {
      setMaterialsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Title level={2} className={styles.title}>
        Дополнительные сервисы
      </Title>
      <div className={styles.contentWrapper}>
        <Tabs defaultActiveKey="1" centered type="card">
          <TabPane
            tab={
              <span className={styles.tabLabel}>
                <span className={styles.iconWrapper}>
                  <PlusCircleOutlined />
                </span>
                Добавить курс
              </span>
            }
            key="1"
          >
            <Card>
              <Form form={courseForm} layout="vertical" onFinish={onFinishCourse}>
                <Form.Item
                  name="name"
                  label="Название курса"
                  rules={[{ required: true, message: 'Пожалуйста, введите название курса' }]}
                >
                  <Input placeholder="Введите название курса" />
                </Form.Item>
                <Form.Item
                  name="description"
                  label="Описание курса"
                  rules={[{ required: true, message: 'Пожалуйста, введите описание' }]}
                >
                  <Input.TextArea rows={3} placeholder="Введите описание" />
                </Form.Item>
                <Form.Item
                  name="semester"
                  label="Семестр"
                  rules={[{ required: true, message: 'Пожалуйста, укажите семестр' }]}
                >
                  <InputNumber min={0} max={8} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="hours"
                  label="Количество часов"
                  rules={[{ required: true, message: 'Пожалуйста, укажите количество часов' }]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="teacher" label="Преподаватель">
                  <Input disabled />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Добавить курс
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
          <TabPane
            tab={
              <span className={styles.tabLabel}>
                <span className={styles.iconWrapper}>
                  <BookOutlined />
                </span>
                Добавить материал
              </span>
            }
            key="2"
          >
            <Card>
              <Form form={materialForm} layout="vertical" onFinish={onFinishMaterial}>
                <Form.Item
                  name="courseId"
                  label="Выберите курс"
                  rules={[{ required: true, message: 'Пожалуйста, выберите курс' }]}
                >
                  <Select placeholder="Выберите курс">
                    {courses.map(course => (
                      <Option key={course.id} value={course.id}>
                        {course.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Название материала"
                  rules={[{ required: true, message: 'Пожалуйста, введите название материала' }]}
                >
                  <Input placeholder="Введите название материала" />
                </Form.Item>
                <Form.Item
                  name="material_type"
                  label="Тип материала"
                  rules={[{ required: true, message: 'Пожалуйста, выберите тип материала' }]}
                >
                  <Select placeholder="Выберите тип">
                    {Object.values(MaterialType).map(type => (
                      <Option key={type} value={type}>
                        {materialTypeTranslations[type]}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="number"
                  label="Номер"
                  rules={[{ required: true, message: 'Пожалуйста, укажите номер' }]}
                >
                  <InputNumber min={1} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="content"
                  label="Содержание"
                  rules={[{ required: true, message: 'Пожалуйста, введите содержание' }]}
                >
                  <Input.TextArea rows={4} placeholder="Введите содержание" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Добавить материал
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
          <TabPane
            tab={
              <span className={styles.tabLabel}>
                <span className={styles.iconWrapper}>
                  <FileAddOutlined />
                </span>
                Добавить файл
              </span>
            }
            key="3"
          >
            <Card>
              <Form form={fileForm} layout="vertical" onFinish={onFinishFile}>
                <Form.Item
                  name="selectCourseForFile"
                  label="Выберите курс"
                  rules={[{ required: true, message: 'Пожалуйста, выберите курс' }]}
                >
                  <Select placeholder="Выберите курс" onChange={handleCourseChange}>
                    {courses.map(course => (
                      <Option key={course.id} value={course.id}>
                        {course.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="selectMaterialForFile"
                  label="Выберите материал"
                  rules={[{ required: true, message: 'Пожалуйста, выберите материал' }]}
                >
                  <Select
                    placeholder="Сначала выберите курс"
                    disabled={materialsLoading || materials.length === 0}
                    loading={materialsLoading}
                  >
                    {materials.map(material => (
                      <Option key={material.id} value={material.id}>
                        {`${material.name} (${
                          materialTypeTranslations[material.material_type as MaterialType] ||
                          material.material_type
                        })`}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="file_name"
                  label="Название файла"
                  rules={[{ required: true, message: 'Пожалуйста, введите название файла' }]}
                >
                  <Input placeholder="Введите название файла" />
                </Form.Item>
                <Form.Item name="file_description" label="Описание файла">
                  <Input.TextArea rows={2} placeholder="Введите краткое описание (необязательно)" />
                </Form.Item>
                <Form.Item
                  name="file"
                  label="Выберите файл"
                  valuePropName="fileList"
                  getValueFromEvent={e => (Array.isArray(e) ? e : e && e.fileList)}
                  rules={[{ required: true, message: 'Пожалуйста, загрузите файл' }]}
                >
                  <Upload beforeUpload={() => false} maxCount={1} listType="text">
                    <Button icon={<UploadOutlined />}>Нажмите для загрузки</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Загрузить файл
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default ExtraServicesPage