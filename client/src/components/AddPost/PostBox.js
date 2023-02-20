import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

import authConfig, { config } from "../../config";
import { PostRequest } from "../../utils/ProfileMethods";

function PostBox() {
  const [skillSelected, setSkillsSelected] = useState([]);

  const input = useRef("");
  const type = useRef("");
  const title = useRef("");

  const filed = useRef("");
  const addSkills = () => {
    setSkillsSelected((prev) => [...prev, input.current.value]);
  };
  const { token } = useSelector((state) => state.user.userData);
  const handleSubmit = async () => {
    console.log(title.current.value);
    const [data, err] = await PostRequest(
      "http://localhost:4000/createPost",
      {
        userType: type.current.value,
        filed: filed.current.value,
        title: title.current.value,
        skills: skillSelected,
      },
      authConfig(token)
    );
    if (err) return;
  };
  return (
    <div className=" w-full bg-main shadow-lg shadow-white p-4 ">
      <textarea
        className="bg-[#fff] p-5 text-[#333] resize-none w-full outline-none rounded-md min-h-[200px] placeholder:text-open font-bold"
        placeholder="what you need ? "
        spellCheck="false"
        ref={title}
      />
      <div className="grid grid-cols-3 gap-4 mt-3 text-main relative">
        <select
          defaultValue={"Programming"}
          className="p-2 bg-open text-white "
          ref={filed}
        >
          <option>Programming</option>
        </select>
        <div className="w-full relative left-0">
          <input
            placeholder="skills"
            ref={input}
            className="w-full absolute h-full z-10 shadow-lg left-0 p-3 bg-open placeholder:text-white text-white text-lg capitalize"
          />
          <i
            onClick={addSkills}
            className="fa-solid fa-paper-plane z-20 absolute right-2 top-1 duration-500 hover:translate-x-3 hover:-translate-y-3 hover:text-2xl cursor-pointer text-xl text-white"
          >
            f
          </i>
        </div>
        <select
          defaultValue={true}
          className="p-2 bg-open text-white "
          placeholder="type"
          ref={type}
        >
          <option
            value={"volunteer"}
            className="p-3 bg-open hover:bg-white font-bold "
          >
            volunteer
          </option>
          <option value={"needy"} className="p-3 hover:bg-white bg-open">
            needy
          </option>
        </select>
      </div>
      <div className={`flex relative duration-1000 py-2 overflow-hidden `}>
        {skillSelected.map((sk, index) => {
          return (
            <span
              key={index}
              className={` animate-waving-left mr-2 duration-1000 px-4 shadow-lg py-2 bg-neutral-100 text-main text-xl rounded-lg`}
            >
              {sk}
            </span>
          );
        })}
      </div>
      <button
        className="outline-btn hover:bg-open capitalize"
        onClick={handleSubmit}
      >
        submit
      </button>
    </div>
  );
}

export default PostBox;
