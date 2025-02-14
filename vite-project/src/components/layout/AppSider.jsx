import React from "react";
import {Layout} from "antd";
import {useSubjects} from "../../context/courses-context";

const siderStyle = {
  padding: '1rem',
  backgroundColor: '#0958d9',
};

export default function AppSider() {
  const {coursesData, loading, error} = useSubjects();

  if (loading) {
    return <div>Загрузка...</div>; // Пока идет загрузка
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>; // В случае ошибки
  }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      <h2>Доступные курсы</h2>
      <ul>
        {coursesData.map((subject) => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>
    </Layout.Sider>
  );
}
