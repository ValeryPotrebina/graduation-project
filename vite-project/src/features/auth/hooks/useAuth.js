import { checkAuth, logout } from "../services/authService";
import React, { useState, useEffect } from "react";


export function useAuth() {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false);


    useEffect(() => {

        const loadUser = async () => {
            setUserLoading(true);
            try {
                const user = await checkAuth();
                if (user) {
                    setCurrentUser(user);
                } else {
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error("Ошибка при проверке авторизации:", error);
                setCurrentUser(null);
            } finally {
                setUserLoading(false);
            }
        }
        loadUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setCurrentUser(null);
        } catch (error) {
            console.error("Ошибка при выходе:", error);
        }
    };

    return { currentUser, userLoading, handleLogout, setCurrentUser};

}