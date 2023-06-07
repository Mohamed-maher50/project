import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";

function Request({ body, handleAccept, handleCanceled }) {
  const { user } = useSelector((state) => state.user.userData);

  if (body.isAccepted && body.isAccepted != user._id)
    return (
      <div
        className={`p-5 grow font-semibold  first-letter:uppercase  cursor-pointer duration-200 bg-[#ffe5c1]   shadow-sm  rounded-xl m-2`}
      >
        <div className="flex justify-between">
          <div className="grow">
            {body.body}
            <p>{body.createAt}</p>
          </div>
        </div>
      </div>
    );
  if (body.canceled?.includes(user._id)) return <></>;
  return (
    <div
      className={`p-5 grow ${
        body?.isAccepted == user._id
          ? "bg-green-200 text-mainColor"
          : "bg-white text-black "
      }  font-semibold  first-letter:uppercase  cursor-pointer duration-200 hover:bg-[#ffe5c1]   shadow-sm  rounded-xl m-2`}
    >
      <div className="flex justify-between">
        <div className="grow">
          {body.body}
          <p>{body.createAt}</p>
        </div>
        <div className="flex gap-x-1">
          {!body?.isAccepted && (
            <button
              onClick={() => handleAccept(body)}
              className="w-10 h-10 text-white shadow hover:bg-white duration-300 hover:text-blue-500 p-3 rounded-full bg-blue-500"
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}

          {!body?.isAccepted && (
            <button
              onClick={() => handleCanceled(body._id)}
              className={`w-10 h-10 text-white shadow hover:bg-white duration-300 hover:text-red-500 p-3 rounded-full bg-red-500`}
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
function notificationItem({ body, request }) {
  return (
    <div className="p-5  font-semibold  first-letter:uppercase cursor-pointer duration-200 hover:bg-[#ffe5c1]  bg-darkWhite text-mainColor  shadow-lg  rounded-xl m-2">
      {body.body}
      <p>{body.createAt}</p>
    </div>
  );
}

export { Request, notificationItem };
