import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import { useSelector } from "react-redux";
import citys from "../citys";
import Select from "react-select";
import { PostRequest } from "../../utils/ProfileMethods";

function Requestbox() {
  const [open, setOpen] = useState(true);
  const { user } = useSelector((state) => state.user.userData);
  const { sockets } = useSelector((s) => s.socket);
  // const { chatsId } = useSelector((s) => s.chat);
  const selectCity = useRef("");
  const body = useRef("");
  const sendRequest = async () => {
    try {
      const [data, err] = await PostRequest("/api/createRequest", {
        body: body.current.value,
        city: selectCity.current.getValue()[0].value,
      });
      if (!err) sockets?.emit("newRequest", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`text-black shadow-md rounded-md p-2 requestBox  duration-1000  cursor-pointer active flex flex-col w-full bg-white mt-3`}
    >
      <textarea
        ref={body}
        placeholder="write your message "
        className="w-full resize-none bg-main  p-5 mt-5 outline-none overflow-y-auto"
      ></textarea>
      <Select
        options={[{ value: "all", label: "all" }, ...citys]}
        ref={selectCity}
        className="w-4/5 mx-auto my-5"
        placeholder="choose City"
        required={true}
      />
      <button
        onClick={sendRequest}
        className="py-2 main-btn px-10 mx-auto  rounded-md"
      >
        Send
      </button>
    </div>
  );
}

export default Requestbox;
