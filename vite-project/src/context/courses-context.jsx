import { createContext, useEffect, useContext, useState } from "react";
import { subjects } from "../data";
import { getSubjects } from "../api";

const CoursesContext = createContext();

export function CoursesContextProvider({ children }) {
  const [coursesData, setCoursesData] = useState(subjects);
  const [loading, setLoading] = useState(false); // Статус загрузки данных
  const [error, setError] = useState(null); // Статус ошибки

  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    async function loadSubjects() {
      try {
        setLoading(true);
        const data = await getSubjects();
        setCoursesData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    loadSubjects();
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        coursesData,
        loading,
        error,
        selectedSubject,
        setSelectedSubject,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

export function useSubjects() {
  return useContext(CoursesContext);
}
