import { API_BASE_URL } from '@/constants/endpoints'
import axios from 'axios'

const requester = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

export default requester
