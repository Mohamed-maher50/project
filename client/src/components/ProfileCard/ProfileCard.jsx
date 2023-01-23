import React from "react";

function ProfileCard({ user, id }) {
  return (
    <>
      <div className="w-fit  text-black relative bg-white rounded-lg p-3 shadow-sm shadow-white">
        <div className="flex items-center">
          <button className="main-btn  hover:mb-3 h-fit translate-x-14">
            Follower
          </button>
          <img src={user?.AvatarUrl} className=" w-40 h-40 mx-5 rounded-full" />
          <button className="main-btn h-fit hover:mb-3 -translate-x-14">
            message
          </button>
        </div>
        <h4 className="text-center text-2xl  my-2 font-extralight text-black ">
          {user?.firstName + " " + user?.lastName}
        </h4>
        <h4 className="text-center text-xl capitalize font-semibold text-gray-600">
          cairo / giza
        </h4>
        <div className="flex justify-evenly my-2 ">
          <span className="flex flex-col text-main shadow-lg items-center bg-gray-50 p-2 font-bold text-xl capitalize rounded-lg">
            Followers
            <span className=" text-secondary">12312</span>
          </span>
          <span className="flex flex-col text-main shadow-lg items-center bg-gray-50 p-2 font-bold text-xl capitalize rounded-lg">
            helpes
            <span className=" text-secondary">122</span>
          </span>
          <span className="flex flex-col  text-main shadow-lg items-center bg-gray-50 p-2 font-bold text-xl capitalize rounded-lg">
            Ranks
            <span className=" text-secondary">41</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
