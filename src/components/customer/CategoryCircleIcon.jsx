import React from "react";
import CircleIcon from "../common/CircleIcon";

function CategoryCircleIcon({ category, isActive, onClick, theme = "glass" }) {
  return (
    <button
      onClick={() => onClick(category.id)}
      className={`focus:outline-none transition ${
        isActive ? "scale-105" : "opacity-80 hover:opacity-100"
      }`}
    >
      <CircleIcon
        id={category.id}
        label={category.label}
        iconSrc={`/icons/${category.id}.png`}
        theme={theme}
      />
    </button>
  );
}

export default CategoryCircleIcon;