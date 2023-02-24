import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
function OnlineFriends({ user }) {
  return (
    <article className="flex lg:flex items-center justify-end my-2  bg-white px-2 py-2 shadow-md cursor-pointer shadow-main rounded-full">
      <FontAwesomeIcon
        icon={faMessage}
        className=" text-blue-800 bg-darkWhite p-3 rounded-full mr-auto ml-5  "
      />
      <p className="text-black mx-2 -translate-y-2 font-semibold">
        {user.fullName}
      </p>
      <img
        src={user.AvatarUrl}
        className="w-12 h-12 object-cover rounded-full "
      />
    </article>
  );
}

export default OnlineFriends;
