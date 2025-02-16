import { Layout } from "antd";
import { useSubjects } from "../../context/courses-context";
import {Card} from "antd";


const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#051559",
  padding: "1rem",
};
export default function AppContent() {
  const { selectedSubject } = useSubjects();

  if (!selectedSubject) {
    return (
      <Layout.Content style={contentStyle}>
        <h1>Выберите предмет из списка, чтобы увидеть материалы.</h1>
      </Layout.Content>
    )
  }

  const {name, amount_of_hours, department, materials} = selectedSubject
  const {lectures = [], seminars = [], labs = []} = materials || {}

  return (
    <Layout.Content style={contentStyle}>
      <h2>{name}</h2>
      <p>Количество часов: {amount_of_hours}</p>
      <p>Кафедра: {department}</p>

      <h3 style={{ marginTop: "1rem" }}>Лекции:</h3>
      {lectures.length > 0 ? (
        lectures.map((lecture, index) => (
          <Card
            key={index}
            style={{ marginBottom: "1rem", backgroundColor: "#093973", color: "#fff" }}
          >
            <h4>{lecture.title}</h4>
            <p>{lecture.description}</p>
            {/* Если есть ссылка, отобразим её */}
            {lecture.link && (
              <a href={lecture.link} target="_blank" rel="noreferrer" style={{ color: "#fff" }}>
                Открыть материал
              </a>
            )}
          </Card>
        ))
      ) : (
        <p>Лекции не найдены.</p>
      )}

      <h3 style={{ marginTop: "1rem" }}>Семинары:</h3>
      {seminars.length > 0 ? (
        seminars.map((seminar, index) => (
          <Card
            key={index}
            style={{ marginBottom: "1rem", backgroundColor: "#093973", color: "#fff" }}
          >
            <h4>{seminar.title}</h4>
            <p>{seminar.description}</p>
          </Card>
        ))
      ) : (
        <p>Семинары не найдены.</p>
      )}

      <h3 style={{ marginTop: "1rem" }}>Лабораторные:</h3>
      {labs.length > 0 ? (
        labs.map((lab, index) => (
          <Card
            key={index}
            style={{ marginBottom: "1rem", backgroundColor: "#093973", color: "#fff" }}
          >
            <h4>{lab.title}</h4>
            <p>{lab.description}</p>
          </Card>
        ))
      ) : (
        <p>Лабораторных не найдено.</p>
      )}
    </Layout.Content>
  );
}