
export function groupCoursesBySemester(courses) {
    const groupedCourses = {};
  
    courses.forEach((course) => {
      const sem = course.semester;
      if (!groupedCourses[sem]) {
        groupedCourses[sem] = [];
      }
      groupedCourses[sem].push(course);
    });
    return groupedCourses;
  }
