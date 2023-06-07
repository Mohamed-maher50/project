import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatId, newMessage } from "../../store/ChatReducer";
import Chat_comp from "../chat/Chat_comp";

import sound1 from "../../sounds/sound1.mp3";
function Chats() {
  const { chats } = useSelector((state) => state.chat);
  const { sockets } = useSelector((s) => s.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sockets) {
      sockets.on("receiveMessage", (data) => {
        console.log(data);
        try {
          let audio = new Audio(sound1);
          audio
            .play()
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        } catch (error) {}

        dispatch(getChatId(data.sender));

        dispatch(newMessage(data));
      });
    }
  }, [sockets]);
  return (
    <div className="flex fixed right-5 bottom-5">
      {chats.map((chat, index) => {
        return <Chat_comp chat={chat} key={index} />;
      })}
    </div>
  );
}

export default Chats;
