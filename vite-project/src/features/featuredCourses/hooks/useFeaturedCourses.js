import { useState, useEffect } from "react";
import { getFeaturedCourses } from "../services/featuredCoursesService";
import { addFeaturedCourse, removeFeaturedCourse } from "../services/featuredCoursesService";
export function useFeaturedCourses() {
  const [featuredCourses, setFeaturedCourses] = useState([])
  const [featuredLoading, setFeaturedLoading] = useState(false);

  useEffect(() => {
    loadFeatured();
  }, []);

  const loadFeatured = async () => {
    setFeaturedLoading(true);
    try {
      const { data } = await getFeaturedCourses();
      setFeaturedCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Ошибка при загрузке избранных курсов:", error);
      setFeaturedCourses([]);
    } finally {
      setFeaturedLoading(false);
    }
  };
  async function addToFeatured(courseId) {
    setFeaturedCourses((prev) => [...prev, { id: courseId }]);
    try {
      await addFeaturedCourse(courseId);
      // если хотите ещё раз загрузить данные с сервера:
      await loadFeatured();
    } catch (error) {
      // Откат, если запрос не удался
      setFeaturedCourses((prev) => prev.filter((c) => c.id !== courseId));
      throw error; // чтобы дальше обработать ошибку
    }
  }

  async function removeFromFeatured(courseId) {
    // Сразу удаляем из стейта
    setFeaturedCourses((prev) => prev.filter((c) => c.id !== courseId));

    try {
      await removeFeaturedCourse(courseId);
      // если хотите ещё раз загрузить данные с сервера:
      // await loadFeatured();
    } catch (error) {
      // Если не получилось удалить, вернём обратно
      setFeaturedCourses((prev) => [...prev, { id: courseId }]);
      throw error;
    }
  }

  return { featuredCourses, featuredLoading, addToFeatured, removeFromFeatured};
}