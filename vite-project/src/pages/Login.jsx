import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin  = async (values) => {
    try {
      setLoading(true);
      await login(values);
      message.success("Успешный вход!");
      navigate("/");
    } catch (error) {
      console.error(error);
      message.error("Ошибка при входе. Проверьте логин и пароль.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <Title level={2}>Вход</Title>
      <Form
        name="login"
        layout="vertical"
        onFinish={handleLogin}
      >
        <Form.Item
          label="Имя пользователя"
          name="username"
          rules={[{ required: true, message: "Введите имя пользователя!" }]}
        >
          <Input placeholder="Username" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Введите пароль!" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
