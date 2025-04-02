import React, { useState, useEffect } from "react";
import { Button, Space, Layout, Select } from "antd";
import { useNavigate } from "react-router-dom";

import { getCourses } from "../../services/coursesApi";

//? TODO ВЫНЕСТИ ПОЛУЧЕНИЕ КУРСОВ В КОНТЕКСТ

const headerStyle = {
  width: "100%",
  textAlign: "center",
  color: "#fff",
  height: 65,
  padding: "1rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

export default function AppHeader() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      try {
        const response = await getCourses(); // Получаем данные от API
        const data = response?.data; // Извлекаем курсы из объекта `data`
        
        // Проверяем, что полученные данные - это массив
        if (Array.isArray(data)) {
          setCourses(data); // Устанавливаем курсы в состояние
        } else {
          console.error("Полученные данные не содержат массив", data);
          setCourses([]); // Если данных нет, ставим пустой массив
        }
      } catch (error) {
        console.error("Ошибка при получении курсов:", error);
        setCourses([]); // В случае ошибки тоже ставим пустой массив
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  const coursesOptions = courses.map((course) => ({
    value: course.id,
    label: course.name,
  }));

  const handleRegister = () => {
    navigate("/register"); // Переход на страницу регистрации
  };

  const handleLogin = () => {
    navigate("/login"); // Переход на страницу входа
  };

  return (
    <>
      <Layout.Header style={headerStyle}>
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Choose course"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          loading={loading}
          options={coursesOptions}
          // onSelect={handleSelect}
        />
        <nav>
          <Space>
            <Button onClick={handleRegister}>Регистрация</Button>
            <Button onClick={handleLogin}>Войти</Button>
          </Space>
        </nav>
      </Layout.Header>
    </>
  );
}
