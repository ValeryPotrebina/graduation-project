import React from 'react';
import { Layout } from "antd";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  padding: "1rem",
  color: "rgba(255, 255, 255, 0.85)",
  backgroundColor: '#0958d9',

  // backgroundColor: "rgba(255, 255, 255, 0.78)",
};

export default function AppContent() {
  return (
    <Layout.Content style={contentStyle} >
      <h1>Добро пожаловать в Базу знаний студента!</h1>
      <p>Здесь будут ваши курсы и материалы.</p>
    </Layout.Content>
  );
};

