import { Button, Space, Layout, Select, Avatar, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { addFeaturedCourse } from "../../features/courses/services/userService";
import styles from "./AppHeader.module.css"; // Импорт стилей
import { useCourses } from "../../features/courses/hooks/useCourses";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { LoadingOutlined } from "@ant-design/icons";
import { useNotificationService } from "../../shared/notification/NotificationProvider";
import { PATHS } from "../../config/config";

export default function AppHeader() {
  const navigate = useNavigate();
  const { courses, coursesLoading } = useCourses();
  const { currentUser, userLoading, handleLogout, setCurrentUser } = useAuth();
  const { notifySuccess, notifyWarning, notifyError, notifyInfo } = useNotificationService();

  const handleAddToFeatured = async (courseId) => {
    if (!currentUser) {
      notifyWarning({
        message: "Предупреждение",
        description:
          "Вы должны быть авторизованы, чтобы добавить курс в избранные.",
      });
      return;
    }
    try {
      await addFeaturedCourse(courseId);
      notifySuccess({
        message: "Успех",
        description: "Курс успешно добавлен в избранные.",
      })
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notifyWarning({
          message: "Предупреждение",
          description: "Курс уже добавлен в избранные.",
        })
      } else {
        console.error("Ошибка при добавлении курса в избранные", error);
        notifyError({
          message: "Ошибка",
          description: "Произошла ошибка при добавлении курса в избранные.",
        })
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
  };

  // компонент для отображения информации о пользователе
  const UserActions = ({
    currentUser,
    userLoading,
    handleUserLogout,
    handleRegister,
    handleLogin,
  }) => {
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
