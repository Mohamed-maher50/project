import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { socket } from "../../App";
import authConfig from "../../config";
import { getRequest, userAlreadyFollowing } from "../../utils/ProfileMethods";

function ProfileCard() {
  const { token, user } = useSelector((state) => state.user.userData);

  const [cardInfo, setCardInfo] = useState(undefined);
  const { id } = useParams();
  const sendMessage = () => {
    socket.emit("joinWith", "Room");
  };
  useEffect(() => {
    console.log(socket);
  }, [socket]);
  useEffect(() => {
    const getCardInfo = async () => {
      const [data, err] = await getRequest(
        `http://localhost:4000/profile/card/${id}`,
        authConfig(token)
      );
      if (data) setCardInfo(JSON.parse(data));
    };

    getCardInfo();
  }, [id]);

  const SendFollow = async () => {
    const { data } = await axios.put(
      `http://localhost:4000/profile/follow`,
      {
        id: id,
      },
      authConfig(token)
    );
    setCardInfo(JSON.parse(data).data);
  };

  if (!cardInfo) return <>loogin</>;
  const AlreadyFollowing = userAlreadyFollowing(cardInfo, user._id);
  return (
    <>
      <div className="w-full text-black relative bg-white rounded-lg p-3 shadow-sm shadow-white">
        <div className="flex items-center">
          {id != user?._id && (
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
            src={cardInfo?.AvatarUrl}
            className=" w-40 h-40  rounded-full mx-auto"
          />
          {id != user?._id && (
            <button
              className="main-btn h-fit hover:mb-3 -translate-x-14"
              onClick={sendMessage}
            >
              message
            </button>
          )}
        </div>
        <h4 className="text-center text-2xl  my-2 font-extralight text-black ">
          {cardInfo.fullName}
        </h4>
        <h4 className="text-center text-xl capitalize font-semibold text-gray-600">
          cairo / giza
        </h4>
        <div className="flex justify-evenly my-2 ">
          <span className="flex flex-col text-main shadow-lg items-center bg-gray-50 p-2 font-bold text-xl capitalize rounded-lg">
            Follower
            <span className=" text-secondary">{cardInfo.followers.length}</span>
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
