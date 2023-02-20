import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeChat } from "../../store/ChatReducer";
import { displayError } from "../../validate/displayError";

function Chat_comp({ chat }) {
  const { sockets, chatsId } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user.userData);
  console.log(chatsId);

  const dispatch = useDispatch();
  const chatValue = useRef("");
  const boxChat = useRef("");

  const sendMessage = () => {
    if (chatValue.current.value.trim() === "")
      return displayError("please enter anything", { position: "top-right" });
    if (sockets)
      sockets.emit("newMessage", {
        roomId: chat._id,
        data: {
          msg: chatValue.current.value,
          avatarUrl: user.AvatarUrl,
          chatId: chat._id,
          username: user.fullName,
          _id: user._id,
        },
      });
  };
  useEffect(() => {
    // boxChat?.current?.scrollIntoView({
    //   behavior: "smooth",
    // });
  }, [chatsId]);

  return (
    <div
      className={`absolute border-white border-2 p-2 shadow-md shadow-secondary right-5 bottom-5 w-96 flex flex-col bg-main text-white ${
        chat.isActive ? "" : "hidden"
      }`}
    >
      <div className="relative flex justify-end p-2 text-2xl">
        <i
          className="fa-solid fa-xmark text-white cursor-pointer duration-150 hover:text-secondary"
          onClick={() => dispatch(removeChat(chat._id))}
        ></i>
      </div>
      <div className="flex items-center justify-between ">
        <img src={chat.AvatarUrl} alt={chat.fullName} className="w-10 h-10" />
        <h4 className="ml-2 text-xl capitalize font-Josefin">
          {chat.fullName}
        </h4>
      </div>
      {/* box chats  */}
      <div className="h-[250px] overflow-y-scroll bg-slate-200 my-2">
        {/* chat */}
        {chat.messages.map((ch, index) => {
          console.log(ch.chatId == user._id);

          return (
            <div
              ref={boxChat}
              className={`p-2 flex flex-col font-Josefin font-bold `}
              key={index}
            >
              <div
                className={`p-2 flex items-center capitalize   ${
                  ch._id != user._id
                    ? ""
                    : "justify-end flex-row-reverse ml-auto text-center"
                }`}
              >
                <img
                  src={ch.avatarUrl}
                  alt=""
                  className="mr-2 w-8 h-8 rounded-full"
                />
                <span className="text-gray-700">{ch.username}</span>
              </div>
              <div
                className={`bg-secondary text-white
              p-3 ml-9  rounded-b-md ${ch._id != user._id ? "" : "text-end"}`}
              >
                <span className="">{ch.msg}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex border-white border-2">
        <input
          ref={chatValue}
          placeholder="type...."
          className="h-10 w-full outline-none p-2 text-main"
        />
        <button
          onClick={sendMessage}
          className="outline-btn rounded-none border-none  m-0"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default Chat_comp;
