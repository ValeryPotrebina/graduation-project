import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

export function FavoriteStar({ isFavorite, onClick }) {
  const Icon = isFavorite ? StarFilled : StarOutlined;
  const color = isFavorite ? "gold" : "#999";

  return (
    <Icon
      style={{
        color,
        marginLeft: "0.5rem",
        fontSize: "16px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
}
