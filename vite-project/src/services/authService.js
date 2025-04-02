import axios from "axios";
import { API_BASE_URL, ENDPOINTS } from "./config";

const API = axios.create({
  baseURL: API_BASE_URL, 
  withCredentials: true,  
});

export const register = async ({ username, email, password }) => {
  try {
    const response = await API.post(ENDPOINTS.auth.register, {
      username,
      email,
      password,
    });
    // response.data должен содержать { data: { ...userData } }
    console.log("response", response)
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const login = async ({ username, password }) => {
  try {
    const response = await API.post(ENDPOINTS.auth.login, {
      username,
      password,
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export const check = async () => {
  try {
    const response = await API.post(ENDPOINTS.auth.check);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await API.post(ENDPOINTS.auth.logout);
    return response.data;
  } catch (error) {
    throw error;
  }
};
