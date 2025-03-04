import { useState, useEffect } from "react";
import { Modal, Spin, Typography, List, Divider } from "antd";
const { Text, Link } = Typography;
import { fetchCourseMaterials } from "../api/coursesApi";

export default function CourseInfoModal({ isOpen, onClose, course }) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Сбрасываем материалы при каждом открытии/смене курса
    setMaterials([]);

    if (course?.id && isOpen) {
      loadMaterials(course.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, isOpen]);

  async function loadMaterials(courseId) {
    try {
      setLoading(true);
      const data = await fetchCourseMaterials(courseId);
      setMaterials(data);
    } catch (e) {
      console.error("Ошибка при загрузке материалов:", e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      title={course ? `Материалы курса: ${course.name}` : "Выберите курс"}
    >
      {course && (
        <div>
          <Text type="secondary">{course.description}</Text>
          <Divider />

          {loading ? (
            <Spin tip="Загрузка материалов..." />
          ) : (
            <List
              bordered
              dataSource={materials}
              locale={{ emptyText: "Материалов нет" }}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`${item.material_type} №${item.number}`}
                    description={
                      <>
                        {item.content}
                        {item.url && (
                          <div>
                            Ссылка: <a href={item.url}>{item.url}</a>
                          </div>
                        )}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          )}
        </div>
      )}
    </Modal>
  );
}
