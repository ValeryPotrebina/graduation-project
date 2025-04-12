import { FavoriteStar } from "./FavoriteStar";

export function CourseMenuItem({
  course,
  isFavorite,
  onToggleFavorite,
  onSelectCourse,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onClick={() => onSelectCourse(course)}
    >
      {course.name}
      <FavoriteStar
        isFavorite={isFavorite}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(course, isFavorite);
        }}
      />
    </div>
  );
}
