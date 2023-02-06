import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProfileCard from "../components/ProfileCard/ProfileCard";

import SkillsBar from "../components/smallComponents/SkillsBar";

function Profile() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(undefined);
  const { user } = useSelector((state) => state.user.userData);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`http://localhost:4000/profile/${id}`);
      setCurrentUser(JSON.parse(data));
    };
    fetchUser();
  }, [id, user]);

  return (
    <div>
      <div className="relative pt-4  text-white">
        <div className="w-fit">
          <ProfileCard />
          <div className="w-full my-3 ">
            <SkillsBar currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
