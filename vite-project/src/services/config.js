export const API_BASE_URL = "http://localhost:8000/api";

export const ENDPOINTS = {
    auth: {
        login: `/auth/login`,
        logout: `/auth/logout`,
        register: `/auth/register`,
        check: `/auth/check_authorization`
    },
    courses: {
        list: `/courses`,
        create: `/courses`
    },
    users: {
        featured_courses: `/users/featured_courses`
    }
}

export const PATHS = {
    login: "/login",
    register: "/register",
    home: "/",
}