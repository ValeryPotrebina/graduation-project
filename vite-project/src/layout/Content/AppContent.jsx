import React from "react";
import { Layout } from "antd";
import styles from "./AppContent.module.css";
import { useCourseContext } from "../../features/courses/contexts/CourseContext";
import { Card, Descriptions } from "antd";
export default function AppContent() {
  const { selectedCourse } = useCourseContext();
  return (
    <Layout.Content className={styles.content}>
      {selectedCourse ? (
        <Card title={selectedCourse.name} style={{ width: "100%" }}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Описание">
              {selectedCourse.description || "Нет описания"}
            </Descriptions.Item>
            <Descriptions.Item label="Семестр">
              {selectedCourse.semester}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <>
          <h1>Добро пожаловать в Базу знаний студента!</h1>
          <p>Здесь будут ваши курсы и материалы.</p>
          <p>Выберите курс из меню слева, чтобы увидеть его содержимое.</p>
        </>
      )}
    </Layout.Content>
  );
}
