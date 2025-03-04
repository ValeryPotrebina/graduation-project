import { Layout, Select } from "antd";
import { useState, useEffect } from "react";
import { fetchCourses } from "../../api/coursesApi";
import CourseInfoModal from "../CourseInfoModal";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  color: "#fff",
  height: 60,
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function AppHeader() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Загружаем все курсы
  useEffect(() => {
    async function loadCourses() {
      const data = await fetchCourses();
      setCourses(data);
    }
    loadCourses();
  }, []);

  // При выборе курса — сохраняем в state и открываем модалку
  function handleSelect(courseId) {
    const course = courses.find((c) => c.id === courseId);
    setSelectedCourse(course);
    setIsModalOpen(true);
  }


  const coursesOptions = courses.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  return (
    <Layout.Header style={headerStyle}>
      <Select
        showSearch
        style={{ width: 300 }}
        placeholder="Выберите курс"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "").toLowerCase()
          .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={coursesOptions}
        onSelect={handleSelect}
      />
      <CourseInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={selectedCourse}
      />
    </Layout.Header>
  );
}
