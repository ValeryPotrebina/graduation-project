import axios from "axios";

const BASE_URL = "http://localhost:8000/api/courses"; // Убедись, что сервер запущен!

export async function fetchCourses() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки курсов:", error);
    return [];
  }
}
