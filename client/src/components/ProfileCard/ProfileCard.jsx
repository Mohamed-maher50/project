import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { config } from "../../config";
import { updateUser } from "../../store/user";
import { userAlreadyFollowing } from "../../utils/ProfileMethods";

function ProfileCard({ currentUser }) {
  const { user } = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();
  if (!currentUser) return <div>skilltorn</div>;

  const SendFollow = async () => {
    const { data } = await axios.put(
      `http://localhost:4000/profile/follow`,
      {
        id: currentUser?._id,
      },
      config
    );
    dispatch(updateUser(data));
  };
  const AlreadyFollowing = userAlreadyFollowing(user, currentUser);
  return (
    <>
      <div className="w-full text-black relative bg-white rounded-lg p-3 shadow-sm shadow-white">
        <div className="flex items-center">
          {currentUser._id != user?._id && (
            <button
              className={`main-btn h-fit translate-x-14   ${
                AlreadyFollowing
                  ? "bg-blue-400 disabled  pointer-events-none"
                  : " hover:mb-3 "
              }`}
              onClick={SendFollow}
              disabled={AlreadyFollowing}
            >
              Follower
            </button>
          )}

          <img
            src={currentUser?.AvatarUrl}
            className=" w-40 h-40  rounded-full mx-auto"
          />
          {currentUser._id != user?._id && (
            <button className="main-btn h-fit hover:mb-3 -translate-x-14">
              message
            </button>
          )}
        </div>
        <h4 className="text-center text-2xl  my-2 font-extralight text-black ">
          {currentUser?.fullName}
        </h4>
        <h4 className="text-center text-xl capitalize font-semibold text-gray-600">
          cairo / giza
        </h4>
        <div className="flex justify-evenly my-2 ">
          <span className="flex flex-col text-main shadow-lg items-center bg-gray-50 p-2 font-bold text-xl capitalize rounded-lg">
            Follower
            <span className=" text-secondary">
              {currentUser?.followers.length}
            </span>
          </span>
          <span className="flex flex-col text-main shadow-lg items-center bg-gray-50 p-2 font-bold text-xl capitalize rounded-lg">
            helpes
            <span className=" text-secondary">0</span>
          </span>
          <span className="flex flex-col  text-main shadow-lg items-center bg-gray-50 p-2 font-bold text-xl capitalize rounded-lg">
            Ranks
            <span className=" text-secondary">0</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
