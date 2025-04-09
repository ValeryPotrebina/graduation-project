// services/coursesApi.js
import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "../../../config/config";

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export async function getCourses() {
  const response = await API.get(ENDPOINTS.courses.list);
  return response.data; // Возвращаем { data: [ ... ] }
}


// export async function fetchCourses() {
//   try {
//     const response = await axios.get(BASE_URL);
//     console.log("data", response.data)
//     return response.data.data;
//   } catch (error) {
//     console.error("Ошибка загрузки курсов:", error);
//     return [];
//   }
// }

// export async function fetchCourseMaterials(courseId) {
//   try {
//     const response = await axios.get(`${BASE_URL}/${courseId}/materials`);
//     return response.data;
//   } catch (error) {
//     console.error("Ошибка загрузки материалов курса:", error);
//     return [];
//   }
// }
