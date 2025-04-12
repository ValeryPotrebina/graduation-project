import { useAuth } from "../../auth/hooks/useAuth";
import { useNotificationService } from "../../../shared/notification/NotificationProvider";
import { useFeaturedCourses } from "./useFeaturedCourses";
export const useFavoriteCourses = () => {
    const { currentUser } = useAuth();
    const { notifySuccess, notifyWarning, notifyError } = useNotificationService();
    const { featuredCourses, addToFeatured, removeFromFeatured } = useFeaturedCourses();
  
    const onToggleFavorite = async (course, isFavorite) => {
      if (!currentUser) {
        notifyWarning({
          message: "Предупреждение",
          description: "Вы должны быть авторизованы, чтобы добавить в избранное.",
        });
        return;
      }
      
      try {
        if (isFavorite) {
          await removeFromFeatured(course.id);
          notifyWarning({
            message: "Предупреждение",
            description: "Курс успешно удален из избранных."
          });
        } else {
          await addToFeatured(course.id);
          notifySuccess({
            message: "Успех",
            description: "Курс успешно добавлен в избранные."
          });
        }
      } catch (error) {
        if (error.response?.status === 400) {
          notifyWarning({
            message: "Предупреждение",
            description: "Вы должны быть авторизованы, чтобы добавить в избранное."
          });
        } else {
          notifyError({
            message: "Ошибка",
            description: "Произошла ошибка при добавлении в избранное."
          });
        }
      }
    };
  
    return { featuredCourses, onToggleFavorite };
  };