import { API_BASE_URL, ENDPOINTS } from "./config";

export async function getCourses() {
  try {
    const response = await fetch(`${API_BASE_URL}${ENDPOINTS.courses.list}`, {method: "GET"});
    console.log("response", response)
    return response.json();
  } catch (error) {
    console.error("Ошибка загрузки курсов:", error);
  }
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
