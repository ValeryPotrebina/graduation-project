import { Layout } from "antd";
import { useState, useEffect } from "react";

const headerStyle = {
  width: "100%",
  textAlign: "center",
  color: "#fff",
  height: 60,
  padding: '1rem',
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};


export default function AppHeader() {

  const [courses, setCourses] = useState([]); // Список курсов
  const [isOpen, setIsOpen] = useState(false); // Состояние списка

  useEffect(() => {
    async function loadCourses() {
      const data = await fetchCourses();
      setCourses(data);
    }
    loadCourses();
  }, []);


  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">Мой сайт</h1>
      <nav>
        <div className="relative">
          <button
            className="px-4 py-2 bg-blue-600 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            Курсы
          </button>
          {isOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-lg">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <li key={course.id} className="px-4 py-2 hover:bg-gray-200">
                    {course.name}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">Нет курсов</li>
              )}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
  
};

