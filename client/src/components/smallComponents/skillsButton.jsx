import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { checkIfItsUser } from "../miscellaneous";
function SkillButton({ skill, canEdit, deleteSkill }) {
  return (
    <div className=" bg-white relative group rounded-md  w-fit  cursor-pointer    overflow-hidden">
      <button
        disabled
        className={` bg-mainBlue text-white capitalize rounded-md shadow  h-full text-base  px-2 `}
      >
        {skill.skill}
      </button>

      {checkIfItsUser(skill.user) && canEdit ? (
        <span
          onClick={() => deleteSkill(skill._id)}
          className="group-hover:scale-100 scale-0 duration-200 rounded-md ease-in-out opacity-80 flex items-center justify-center absolute w-full h-full bg-red-500 z-50 top-0 left-0 "
        >
          <FontAwesomeIcon icon={faTrash} className="w-4 h-4 text-white" />
        </span>
      ) : (
        ""
      )}
    </div>
  );
}

export { SkillButton };
