import React from "react";
import {Card, Layout} from "antd";
import {useSubjects} from "../../context/courses-context";

const siderStyle = {
  padding: '1rem',
  backgroundColor: '#0958d9',
};

export default function AppSider() {
  const {coursesData, loading, error, setSelectedSubject} = useSubjects();
  

  // if (loading) {
  //   return <div>Загрузка...</div>; // Пока идет загрузка
  // }

  // if (error) {
  //   return <div>Ошибка: {error.message}</div>; // В случае ошибки
  // }

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {coursesData.map((subject) => (
        <Card key={subject.id} style={{ 
          marginBottom: "1rem", 
          color: "#fff",
          backgroundColor: "#1a73e8",
          border: "1px solid #fff",
          cursor: "pointer", 
          }}
          onClick={() => setSelectedSubject(subject)}>
          <h3>{subject.name}</h3>
          <p>Количество часов: {subject.amount_of_hours}</p>
          <p>Кафедра: {subject.department}</p>
        </Card>
      ))}
    </Layout.Sider>
  );
}
