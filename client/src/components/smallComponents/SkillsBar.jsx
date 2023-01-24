import axios from "axios";
import React, { useState, useEffect } from "react";

import { displayError } from "../../validate/displayError";
import { SkillButton } from "../smallComponents/skillsButton";
import Layout from "./Layout";
function SkillsBar({ user, id }) {
  const [layout, setLayout] = useState(false);
  const [skillValue, setSkillValue] = useState("");
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  const [skills, setSkills] = useState([]);
  const config = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/getSkills",
        config
      );
      console.log(data);
      if (data) setSkills(JSON.parse(data)?.skills);
    };
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setSkillValue(e.target.value);
  };
  const handler = () => {
    setLayout((prev) => !prev);
  };
  const submitSkill = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/addSkill",
        { data: skillValue },
        config
      );
      if (data) {
        setSkills(JSON.parse(data).skills);
        setSkillValue("");
        displayError("success", { type: "success" });
        handler();
      }
    } catch (err) {
      if (err.response.status === 400)
        displayError(JSON.parse(err.response.data).msg);
    }
  };
  return (
    <>
      <div className="text-center text-main rounded-lg p-3 w-full bg-white text-2xl capitalize  font-bold">
        skills
        {user._id == id ? (
          <i
            className="fa-solid fa-pen-to-square ml-3 text-secondary cursor-pointer"
            onClick={handler}
          ></i>
        ) : (
          ""
        )}
        <div className="flex justify-center w-[400px] my-4 gap-2 flex-wrap">
          {skills.map((sk) => {
            return <SkillButton skill={sk} randomColor />;
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
