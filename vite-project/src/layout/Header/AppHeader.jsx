import React, { useState, useEffect } from "react";
import { Button, Space, Layout, Select, Avatar, message  } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { getCourses } from "../../services/coursesApi";
import { addFeaturedCourse } from "../../services/userService"
import styles from "./AppHeader.module.css"; // Импорт стилей
import { checkAuth, logout } from "../../services/authService";

export default function AppHeader() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    async function loadCourses() {
      setLoading(true);
      try {
        const { data } = await getCourses();
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

  useEffect(() => {
    async function check() {
      setLoadingUser(true);
      try {
        const user  = await checkAuth();
        console.log("user", user);
        if (user) { 
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Ошибка при проверке авторизации:", error);
        setCurrentUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    check();
  }, []);

  const handleAddToFeatured = async (courseId) => {
    try {
      if (!currentUser) {
        message.warning("Сначала войдите в систему");
        navigate("/login");
        return;
      }
      console.log(currentUser, courseId);

      await addFeaturedCourse(courseId);
      message.success("Курс добавлен в избранное!");
    } catch (error) {
      console.error("Ошибка при добавлении курса в избранные", error);
      message.error("Не удалось добавить курс в избранные");
    }
  }
  const coursesOptions = courses.map((course) => ({
    value: course.id,
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span>{course.name}</span>
      <PlusOutlined
        style={{ marginLeft: 8 }}
        onClick={(e) => {
          e.stopPropagation(); // чтобы не закрывать селектор
          handleAddToFeatured(course.id);
        }}
      />
    </div>
    )
  }));

  const handleRegister = () => {
    navigate("/register"); // Переход на страницу регистрации
  };

  const handleLogin = () => {
    navigate("/login"); // Переход на страницу входа
  };

  // Логика выхода
  const handleLogout = async () => {
    try {
      await logout();
      setCurrentUser(null);
      navigate("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <>
      <Layout.Header className={styles.header}>
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Choose course"
          optionFilterProp="label"
          // filterSort={(optionA, optionB) =>
          //   (optionA?.label ?? "")
          //     .toLowerCase()
          //     .localeCompare((optionB?.label ?? "").toLowerCase())
          // }
          loading={loading}
          options={coursesOptions}
        />
        <nav>
          {loadingUser ? (
            <span style={{ color: "#fff" }}>Загрузка...</span>
          ) : currentUser ? (
            <Space>
              <Avatar style={{ backgroundColor: "rgb(255, 255, 255)" , color: "rgba(0, 0, 0, 0.85)", marginRight: "10px", width: "40px", height: "40px"}}>
                {currentUser.username[0].toUpperCase()}
              </Avatar>
              <Button onClick={handleLogout}>Выйти</Button>
            </Space>
          ) : (
            <Space>
              <Button onClick={handleRegister}>Регистрация</Button>
              <Button onClick={handleLogin}>Войти</Button>
            </Space>
          )}
        </nav>
      </Layout.Header>
    </>
  );
}
