import { useState, useEffect} from "react";
import { getFeaturedCourses } from "../services/userService";

export function useFeaturedCourses() {
    const [featuredCourses, setFeaturedCourses] = useState([])
    const [featuredLoading, setFeaturedLoading] = useState(false);

    useEffect(() => {
        const fetchFeatured = async () => {
          setFeaturedLoading(true);
          try {
            const { data } = await getFeaturedCourses(); 
            setFeaturedCourses(Array.isArray(data) ? data : []);
          } catch (error) {
            console.error("Ошибка при загрузке избранных курсов:", error);
            setFeaturedCourses([]);
          } finally {
            setFeaturedLoading(false);
          }
        };
    
        fetchFeatured();
      }, []);

      return {featuredCourses, featuredLoading};
}