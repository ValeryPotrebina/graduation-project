import { Layout, Select } from "antd";
import { useState, useEffect } from "react";
import { fetchCourses } from "../../api/coursesApi";

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
  const [courses, setCourses] = useState([]); // Список курсов

  useEffect(() => {
    async function loadCourses() {
      const data = await fetchCourses();
      setCourses(data);
    }
    loadCourses();
  }, []);

  const coursesOptions = courses.map((course) => ({
    value: course.id,
    label: course.name,
  }));

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: 300,
        }}
        placeholder="Выбери курс"
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={coursesOptions}
      />
    </Layout.Header>
  );
}
