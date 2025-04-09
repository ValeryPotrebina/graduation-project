import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function Register() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        setLoading(true);
        try {
          // values содержит { username, email, password }
          await register(values);
          message.success("Регистрация успешно завершена!");
          navigate("/login"); 
        } catch (error) {
          console.error(error);
          message.error("Ошибка при регистрации. Попробуйте снова.");
        } finally {
          setLoading(false);
        }
      };

      return (
        <div style={{ maxWidth: 400, margin: "0 auto" }}>
          <Title level={2}>Регистрация</Title>
          <Form
            name="register"
            layout="vertical"
            onFinish={handleRegister}
          >
            <Form.Item
              label="Имя пользователя"
              name="username"
              rules={[
                { required: true, message: "Пожалуйста, введите имя пользователя!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
    
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Введите вашу почту!" },
                { type: "email", message: "Некорректный формат почты!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
    
            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Введите пароль!" },
                { min: 6, message: "Пароль должен быть не менее 6 символов" },
              ]}
            >
              <Input.Password placeholder="Пароль" />
            </Form.Item>
    
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Зарегистрироваться
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
}