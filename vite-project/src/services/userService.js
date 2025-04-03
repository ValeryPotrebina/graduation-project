import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "./config";

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
});

export async function addFeaturedCourse(courseId) {
  const response = await API.post(`${ENDPOINTS.users.featured_courses}/${courseId}`);
  return response.data; 
}
