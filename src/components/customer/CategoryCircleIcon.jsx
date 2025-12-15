import React from "react";
import CircleIcon from "../common/CircleIcon";

function CategoryCircleIcon({ category, isActive, onClick}) {
  return (
    <button
      onClick={() => onClick(category.code)}
      className={`focus:outline-none transition ${
        isActive ? "scale-105" : "opacity-80 hover:opacity-100"
      }`}
    >
      <CircleIcon
        id={category.code}
        label={category.label}
        iconSrc={`/icons/${category.code}.png`}
      />
    </button>
  );
}

export default CategoryCircleIcon;