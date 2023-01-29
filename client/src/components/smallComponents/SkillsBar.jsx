import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { config } from "../../config";
import { displayError } from "../../validate/displayError";
import { SkillButton } from "../smallComponents/skillsButton";
import Layout from "./Layout";
function SkillsBar({ currentUser }) {
  const [layout, setLayout] = useState(false);
  const [skillValue, setSkillValue] = useState("");
  const { user } = useSelector((state) => state.user.userData);
  const handleChange = (e) => {
    setSkillValue(e.target.value);
  };
  const handler = () => {
    setLayout((prev) => !prev);
  };
  useEffect(() => {}, [currentUser]);

  const submitSkill = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/addSkill",
        { data: skillValue },
        config
      );
      if (data) {
        currentUser.skills = JSON.parse(data).skills;
        setSkillValue("");
        displayError("success", { type: "success" });
        handler();
      }
    } catch (err) {
      if (err.response.status === 400)
        displayError(JSON.parse(err.response.data).msg);
    }
  };
  if (!currentUser) return <>skilton</>;
  return (
    <>
      <div className="text-center text-main rounded-lg p-3 w-full bg-white text-2xl capitalize  font-bold">
        skills
        {currentUser._id == user?._id ? (
          <i
            className="fa-solid fa-pen-to-square ml-3 text-secondary cursor-pointer"
            onClick={handler}
          ></i>
        ) : (
          ""
        )}
        <div className="flex justify-center w-[400px] my-4 gap-2 flex-wrap">
          {currentUser?.skills.map((sk, index) => {
            return <SkillButton skill={sk} randomColor key={index} />;
          })}
        </div>
      </div>
      <Layout handler={handler} isOpen={layout}>
        <input
          className="text-main p-2 font-bold capitalize rounded-lg shadow shadow-white"
          spellCheck={false}
          onChange={handleChange}
          value={skillValue}
        />

        <button className="main-btn" onClick={submitSkill}>
          <i className="fa-solid fa-check text-xl"></i>
        </button>
      </Layout>
    </>
  );
}

export default SkillsBar;
