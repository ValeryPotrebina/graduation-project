import CourseMaterialPage from './components/page/CourseMaterialsPage/CourseMaterialPage'
import HomePage from './components/page/HomePage/HomePage'
import LoginPage from './components/page/LoginPage/LoginPage'
import RegisterPage from './components/page/RegisterPage/RegisterPage'
import { HOME, LOGIN, REGISTER, COURSE_MATERIALS } from './constants/paths'

export const routes = [
  {
    path: HOME,
    element: <HomePage />,
  },
  {
    path: LOGIN,
    element: <LoginPage />,
  },
  {
    path: REGISTER,
    element: <RegisterPage />,
  },
  {
    path: `${COURSE_MATERIALS}/:courseId/:materialType`,
    element: <CourseMaterialPage />,
  },
]
