import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

function AddSkills({ addSkill }) {
  const addSkillBox = useRef("");
  const dispatch = useDispatch();
  const handelSubmit = (e) => {
    e.preventDefault();
    addSkill(addSkillBox.current.value);
  };
  return (
    <form onSubmit={handelSubmit} className="w-fit h-fit flex">
      <input
        ref={addSkillBox}
        className="px-9 w-80 outline-none text-mainColor  font-bold capitalize rounded-l-lg shadow "
        spellCheck={false}
        placeholder="Add your skills"
      />

      <button className=" group   p-3 rounded-r-lg  main-btn duration-500">
        <FontAwesomeIcon
          icon={faCheck}
          className="group-hover:scale-150 duration-300"
        />
      </button>
    </form>
  );
}

export default AddSkills;
