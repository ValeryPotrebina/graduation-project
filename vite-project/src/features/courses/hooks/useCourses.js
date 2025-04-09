import { getCourses } from "../services/coursesService";
import { useState, useEffect} from "react";
  
  
export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      setCoursesLoading(true);
      try {
        console.log("loadCourses")
        const {data} = await getCourses();
        console.log("loadedCourses")
        console.log("data: ", data)
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          setCourses([]);
        }
      } catch (error) {
        setCourses([]);
      } finally {
        setCoursesLoading(false);
      }
    }
    loadCourses();
  }, []);

  return {courses, coursesLoading};
}
  
