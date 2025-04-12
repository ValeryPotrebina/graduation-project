import { Button, Space, Layout, Select, Avatar, notification } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./AppHeader.module.css"; // Импорт стилей
import { useCourses } from "../../features/courses/hooks/useCourses";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { LoadingOutlined } from "@ant-design/icons";
import { PATHS } from "../../config/config";

export default function AppHeader() {
  const navigate = useNavigate();
  const { courses, coursesLoading } = useCourses();
  const { currentUser, userLoading, handleLogout, setCurrentUser } = useAuth();


  const coursesOptions = courses.map((course) => ({
    value: course.id,
    label: (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{course.name}</span>
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
