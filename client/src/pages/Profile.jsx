import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard/ProfileCard";

import SkillsBar from "../components/smallComponents/SkillsBar";

function Profile() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`http://localhost:4000/profile/${id}`);
      setCurrentUser(JSON.parse(data));
    };
    fetchUser();
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="relative pt-4  text-white">
        <div className="w-fit">
          <ProfileCard currentUser={currentUser} id={id} />
          <div className="w-full my-3 ">
            <SkillsBar currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
