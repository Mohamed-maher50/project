import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SkillButton } from "../smallComponents/skillsButton";
import { faPenToSquare, prefix } from "@fortawesome/free-solid-svg-icons";
import AddSkills from "../smallComponents/AddSkills";
import { pushChildren, toggle } from "../../store/Layout";
import {
  DeleteRequest,
  PostRequest,
  getRequest,
} from "../../utils/ProfileMethods";
import { checkIfItsUser } from ".";
import { useParams } from "react-router-dom";
import { displayMsg } from "../../validate/displayError";
var i = 0;
function SkillsBar({ currentUser }) {
  const { user } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [skills, setSkills] = useState([]);
  const { id } = useParams();
  const addSkill = async (value) => {
    const [data, err] = await PostRequest(`/addSkill`, {
      skill: value,
    });
    if (!err) setSkills((prev) => [...prev, data]);
    if (!err) {
      displayMsg("added successfully", { type: "success" });
      return dispatch(toggle());
    }
  };
  const deleteSkill = async (id) => {
    console.log(id);
    const [, err] = await DeleteRequest(`/deleteSkill/${id}`);
    if (!err) setSkills((prev) => prev.filter((sk) => sk._id != id));
    if (!err) displayMsg("deleted", { type: "success" });
  };
  useEffect(() => {
    (async () => {
      const [data, err] = await getRequest(`/getSkills`);
      if (!err) setSkills(data);
    })();
  }, []);
  const pushToShow = () => {
    dispatch(
      pushChildren(
        <div className="flex flex-col items-center" key={++i}>
          <AddSkills addSkill={addSkill} key={i++} currentUser={currentUser} />
          <div
            className="flex justify-center w-full my-4 gap-2 flex-wrap"
            key={++i}
          >
            {skills?.map((sk, index) => {
              return (
                <SkillButton
                  skill={sk}
                  key={index}
                  deleteSkill={deleteSkill}
                  canEdit
                />
              );
            })}
          </div>
        </div>
      )
    );
  };
  if (!currentUser) return <>skilton</>;
  return (
    <>
      <div className="text-center  text-mainColor text-open rounded-lg p-3 w-full text-2xl capitalize  font-bold">
        SKILLS
        {checkIfItsUser(id) ? (
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={pushToShow}
            className="ml-3 text-mainBlue cursor-pointer"
          />
        ) : (
          ""
        )}
        <div className="flex justify-center w-full my-4 gap-2 flex-wrap">
          {skills.map((sk, index) => {
            return (
              <SkillButton
                skill={sk}
                key={index}
                canEdit={true}
                deleteSkill={deleteSkill}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SkillsBar;
