import React from "react";
import NotifictItem from "../notificationItem/NotifictItem";

function NotifcationNav({ notifcationStatusHandler, notifcationStatus }) {
  return (
    <div
      className={`fixed h-screen w-1/2 md:w-[30%]  shadow-lg bg-secondary z-20 ${
        notifcationStatus ? "left-0" : "-left-full"
      } duration-1000  pt-20`}
    >
      <div className="flex justify-end mb-3">
        <i
          className="fa-solid fa-xmark cursor-pointer shadow-sm shadow-main rounded-md p-3 bg-main text-white mr-2"
          onClick={notifcationStatusHandler}
        ></i>
      </div>
      <h1 className=" bg-main text-white shadow-main shadow-sm text-center py-5 border-4 text-xl rounded-lg font-semibold border-secondary">
        Notifcation
      </h1>
      <NotifictItem data={"mohamed maher"} />
    </div>
  );
}

export default NotifcationNav;
