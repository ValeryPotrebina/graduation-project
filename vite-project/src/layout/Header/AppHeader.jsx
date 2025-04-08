import { Button, Space, Layout, Select, Avatar, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { addFeaturedCourse } from "../../services/userService";
import styles from "./AppHeader.module.css"; // Импорт стилей
import { useCourses } from "../../hooks/useCourses";
import { useAuth } from "../../hooks/useAuth";
import { LoadingOutlined } from "@ant-design/icons";

import {PATHS} from "../../services/config";
export default function AppHeader() {
  const navigate = useNavigate();
  const {courses, coursesLoading} = useCourses();
  const {currentUser, userLoading, handleLogout, setCurrentUser} = useAuth();
  const [api, contextHolder] = notification.useNotification();



  const handleAddToFeatured = async (courseId) => {
    try {
      if (!currentUser) {
        api.warning({
          message: "Предупреждение",
          description: "Сначала войдите в систему",
        });
        return;
      }
      await addFeaturedCourse(courseId);
      api.success({
        message: "Успех",
        description: "Курс добавлен в избранное!",
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        api.warning({
          message: "Предупреждение",
          description: "Этот курс уже добавлен в избранные.",
        });
      } else {
        console.error("Ошибка при добавлении курса в избранные", error);
        api.error({
          message: "Ошибка",
          description: "Произошла ошибка при добавлении курса в избранное.",
        });
      }
    }
  };


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
    ),
  }));

  const handleRegister = () => navigate(PATHS.register); 
  const handleLogin = () => navigate(PATHS.login); 
  const handleUserLogout = () => {
    handleLogout();
    navigate(PATHS.home);
  }

  // компонент для отображения информации о пользователе
  const UserActions = ({currentUser, userLoading, handleUserLogout, handleRegister, handleLogin}) => {
    if (userLoading) {
      return <LoadingOutlined />;
    }

    if (currentUser) {
      return (
        <Space>
          <Avatar
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              color: "rgba(0, 0, 0, 0.85)",
              marginRight: "10px",
              width: "40px",
              height: "40px",
            }}
          >
            {currentUser.username[0].toUpperCase()}
          </Avatar>
          <Button onClick={handleUserLogout}>Выйти</Button>
        </Space>
      );
    }

    return (
      <Space>
        <Button onClick={handleRegister}>Регистрация</Button>
        <Button onClick={handleLogin}>Войти</Button>
      </Space>
    );
  };

  return (
    <>
      {contextHolder}
      <Layout.Header className={styles.header}>
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Choose course"
          optionFilterProp="label"
          loading={coursesLoading}
          options={coursesOptions}
        />
        <nav>
          <UserActions
            currentUser={currentUser}
            userLoading={userLoading}
            handleUserLogout={handleUserLogout}
            handleRegister={handleRegister}
            handleLogin={handleLogin}
          />
        </nav>
      </Layout.Header>
    </>
  );
}
