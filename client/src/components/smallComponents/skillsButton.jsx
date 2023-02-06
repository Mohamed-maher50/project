import React from "react";

function SkillButton({ skill, randomColor }) {
  const colors = [
    "bg-orange-400",
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
  ];

  return (
    <button
      disabled
      className={`mx-2 ${
        randomColor
          ? colors[Math.round(Math.random() * (colors.length - 1))]
          : ""
      } capitalize text-white min-w-[80] text-base py-1 px-2 rounded-md  `}
    >
      {skill}
    </button>
  );
}

export { SkillButton };
