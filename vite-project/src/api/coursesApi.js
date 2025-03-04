import axios from "axios";

const BASE_URL = "http://localhost:8000/api/courses"; 

export async function fetchCourses() {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки курсов:", error);
    return [];
  }
}

export async function fetchCourseMaterials(courseId) {
  try {
    const response = await axios.get(`${BASE_URL}/${courseId}/materials`);
    return response.data;
  } catch (error) {
    console.error("Ошибка загрузки материалов курса:", error);
    return [];
  }
}
