import axios from "axios";
import React, { useState } from "react";
import { SkillButton } from "../smallComponents/skillsButton";
import Layout from "./Layout";
function SkillsBar() {
  const [layout, setLayout] = useState(false);
  const [skillValue, setSkillValue] = useState("");
  const handleChange = (e) => {
    setSkillValue(e.target.value);
  };
  const handler = () => {
    setLayout((prev) => !prev);
  };
  const submitSkill = async () => {
    try {
      const res = await axios.post("http://localhost:4000");
    } catch (err) {}
  };
  return (
    <>
      <div className="text-center text-main rounded-lg p-3 w-full bg-white text-2xl capitalize  font-bold">
        skills
        <i
          className="fa-solid fa-pen-to-square ml-3  text-secondary cursor-pointer"
          onClick={handler}
        ></i>
        <div className="flex justify-center w-[400px] my-4 gap-2 flex-wrap">
          <SkillButton skill={"c++"} randomColor />
          <SkillButton skill={"js"} randomColor />
          <SkillButton skill={"css"} randomColor />
          <SkillButton skill={"html"} randomColor />
        </div>
      </div>
      <Layout handler={handler} isOpen={layout}>
        <input
          className="text-main p-2 font-bold capitalize rounded-lg shadow shadow-white"
          spellCheck={false}
          onChange={handleChange}
          value={skillValue}
        />
        <button className="main-btn">
          <i className="fa-solid fa-check text-xl"></i>
        </button>
      </Layout>
    </>
  );
}

export default SkillsBar;
