import React, { useMemo, useState } from "react";
import { Menu } from "antd";
import { useCourses } from "../../features/courses/hooks/useCourses";
import { useGroupedCourses } from "../../features/courses/hooks/useGroupedCourses";
import { useFavoriteCourses } from "../../features/featuredCourses/hooks/useFavoruteCourses";
import {CourseMenuItem} from "../components/CourseMenuItem";
import { useCourseContext } from "../../features/courses/contexts/CourseContext";
const SEMESTER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function AppSiderMenu() {
  const { courses } = useCourses();
  const groupedCourses = useGroupedCourses(courses);
  const { featuredCourses, onToggleFavorite } = useFavoriteCourses();
  const {setSelectedCourse} = useCourseContext();
  const semesterItems = useMemo(
    () =>
      SEMESTER_NUMBERS.map((sem) => {
        const coursesInSem = groupedCourses[sem] || [];

        const children =
          coursesInSem.length > 0
            ? coursesInSem.map((course) => ({
                key: `course-${course.id}`,
                label: (
                  <CourseMenuItem
                    course={course}
                    isFavorite={featuredCourses.some((f) => f.id === course.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelectCourse={setSelectedCourse}
                  />
                ),
              }))
            : [{ key: `empty-${sem}`, label: "Нет курсов", disabled: true }];

        return {
          key: `semester-${sem}`,
          label: `Семестр ${sem}`,
          children,
        };
      }),
    [groupedCourses, featuredCourses, onToggleFavorite, setSelectedCourse]
  );

  const items = [
    {
      key: "courses",
      label: "Курсы",
      children: semesterItems,
    },
    {
      key: "memes",
      label: "Мемы",
    },
    {
      key: "faq",
      label: "FAQ",
    },
  ];

  // Логика "аккордеона": при открытии одного пункта закрывать другие
  const [stateOpenKeys, setStateOpenKeys] = useState(["courses", "semester-1"]);

  // Функция для определения уровня вложенности (чтобы открывать/закрывать корректно)
  const getLevelKeys = (menuItems) => {
    const map = {};
    function traverse(list, level = 1) {
      list.forEach((item) => {
        map[item.key] = level;
        if (item.children) {
          traverse(item.children, level + 1);
        }
      });
    }
    traverse(menuItems);
    return map;
  };

  const levelKeys = useMemo(() => getLevelKeys(items), [items]);

  const onOpenChange = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => !stateOpenKeys.includes(key));
    // Если что-то «открылось»
    if (currentOpenKey) {
      const repeatIndex = openKeys
        .filter((k) => k !== currentOpenKey)
        .findIndex((k) => levelKeys[k] === levelKeys[currentOpenKey]);
      setStateOpenKeys(
        openKeys
          .filter((_, i) => i !== repeatIndex)
          .filter((k) => levelKeys[k] <= levelKeys[currentOpenKey])
      );
    } else {
      // Если «закрылось»
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <>
      <Menu
        mode="inline"
        style={{ height: "100%", borderRight: 0 }}
        items={items}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
