import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { socket } from "../../App";
import authConfig from "../../config";
import { pushToChat } from "../../store/ChatReducer";
import { getRequest, userAlreadyFollowing } from "../../utils/ProfileMethods";

function ProfileCard({ home }) {
  const { token, user } = useSelector((state) => state.user.userData);
  const { sockets, chatsId } = useSelector((state) => state.chat);
  const [cardInfo, setCardInfo] = useState(undefined);

  const { id } = useParams();
  const dispatch = useDispatch();
  const sendMessage = () => {
    if (sockets) sockets.emit("joinWith", id);
    dispatch(pushToChat({ ...cardInfo, isActive: true, messages: [] }));
  };
  useEffect(() => {
    const getCardInfo = async () => {
      const [data] = await getRequest(
        `http://localhost:4000/profile/card/${home ? user._id : id}`,
        authConfig(token)
      );
      if (data) setCardInfo(JSON.parse(data));
    };

    getCardInfo();
  }, [id, user]);

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

  if (!cardInfo) return <>loading</>;
  const AlreadyFollowing = userAlreadyFollowing(cardInfo, user._id);
  return (
    <>
      <div className="w-full p-2 border-white border-2 text-black relative bg-open rounded-lg shadow-md  shadow-darkWhite">
        <div className="flex items-center">
          {home ||
            (id != user?._id && (
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
            ))}

          <img
            src={cardInfo?.AvatarUrl}
            className=" w-40 h-40  rounded-full mx-auto"
          />
          {home ||
            (id != user?._id && (
              <button
                className="main-btn h-fit hover:mb-3 -translate-x-14"
                onClick={sendMessage}
              >
                message
              </button>
            ))}
        </div>
        <h4 className="text-center text-2xl  my-2 font-extralight text-black ">
          {cardInfo.fullName}
        </h4>
        <h4 className="text-center text-xl capitalize font-semibold text-gray-600">
          cairo / giza
        </h4>
        <div className="flex justify-evenly my-2 ">
          <span className="flex flex-col text-white bg-open shadow-lg items-center  p-2 font-bold text-xl capitalize rounded-lg">
            Follower
            <span className=" text-secondary">{cardInfo.followers.length}</span>
          </span>
          <span className="flex flex-col text-white shadow-lg items-center bg-open p-2 font-bold text-xl capitalize rounded-lg">
            following
            <span className=" text-white">{cardInfo.following.length}</span>
          </span>
          <span className="flex flex-col text-white  bg-open shadow-lg items-center  p-2 font-bold text-xl capitalize rounded-lg">
            Ranks
            <span className=" text-white">0</span>
          </span>
        </div>
      </div>
    </>
  );
}

export default ProfileCard;
