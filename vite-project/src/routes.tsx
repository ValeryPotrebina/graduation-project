import AuthPage from './components/page/AuthPage/AuthPage'
import MaterialPage from './components/page/MaterialPage/MaterialPage'
import HomePage from './components/page/HomePage/HomePage'
import LoginPage from './components/page/LoginPage/LoginPage'
import RegisterPage from './components/page/RegisterPage/RegisterPage'
import {
  HOME,
  LOGIN,
  REGISTER,
  COURSE_MATERIALS,
  AUTH,
} from './constants/paths'

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
    element: <MaterialPage />,
  },
  {
    path: AUTH,
    element: <AuthPage />,
  },
]
