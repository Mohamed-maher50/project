import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard/ProfileCard";

import SkillsBar from "../components/smallComponents/SkillsBar";

function Profile() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <NavBar />
      <div className="relative pt-4  text-white">
        <div className="w-fit">
          <ProfileCard user={user} id={id} />
          <div className="w-full my-3 ">
            <SkillsBar user={user} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
