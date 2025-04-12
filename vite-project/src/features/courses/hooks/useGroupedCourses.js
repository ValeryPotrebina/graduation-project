import { useMemo } from "react";

export const useGroupedCourses = (courses) => {
    return useMemo(() => {
      const grouped = {};
      courses?.forEach((course) => {
        const sem = course.semester;
        if (!grouped[sem]) grouped[sem] = [];
        grouped[sem].push(course);
      });
      return grouped;
    }, [courses]);
  };