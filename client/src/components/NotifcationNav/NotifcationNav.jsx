import React, { useEffect, useState } from "react";
import { PostRequest } from "../../utils/ProfileMethods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { getRequest } from "../../utils/ProfileMethods";
import { Request } from "../notificationItem/NotifictItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function NotifcationNav({
  notificationStatusHandler,
  notificationStatus,
  setIsThereNotifications,
}) {
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState([]);
  const { sockets } = useSelector((s) => s.socket);
  const { user } = useSelector((state) => state.user.userData);
  useEffect(() => {
    console.log(user.city);
    if (user) sockets?.emit("setupLocation", { location: user.city });
  }, [sockets, user]);

  useEffect(() => {
    sockets?.on("acceptedRequest", (req) => {
      let clone = requests.filter((rq) => rq._id != req._id);
      clone.push(req);
      setRequests(clone);
    });
    sockets?.emit("setupLocation", { location: user.city });
    sockets?.on("receiveRequest", (data) => {
      if (notificationStatus != true) setIsThereNotifications(true);

      setRequests((prev) => [data, ...prev]);
    });
  }, [sockets]);

  useEffect(() => {
    const getRequests = async () => {
      var [data, err] = await getRequest("/api/getNotifications");
      console.log(data);
      if (!err) {
        setRequests(data);
      } else {
      }
    };
    const getNotifications = async () => {
      const [data, err] = await getRequest("/notification");

      if (!err) setNotification(data);
    };
    getNotifications();
    // getRequests();
  }, []);
  const handleAccept = async (req) => {
    const [data, err] = await PostRequest(`/api/accept/${req._id}`);
    if (!err) {
      const cloneRequests = requests.filter((rq) => rq._id != data._id);

      cloneRequests.push({ ...data, isAccepted: user._id });

      setRequests(cloneRequests);
      sockets?.emit("someRequestAccept", data);
    }
  };
  const handleCanceled = async (id) => {
    const [data, err] = await PostRequest(`/api/canceled/${id}`);
    if (!err) setRequests((prev) => prev.filter((req) => req._id != id));
  };
  return (
    <div
      className={`fixed top-0 overflow-y-auto h-screen w-7/12 md:w-[30%]  shadow-lg bg-mainBlue   z-20 ${
        notificationStatus ? "left-0" : "-left-full"
      } duration-1000  pt-16`}
    >
      <div className="flex justify-end mb-3 ">
        <FontAwesomeIcon
          icon={faWindowClose}
          className=" cursor-pointer text-3xl mr-3 text-white hover:scale-125 duration-500"
          onClick={notificationStatusHandler}
        />
      </div>
      <div className=" p-3 flex flex-col gap-4">
        {notification.map(
          ({ from: { _id, AvatarUrl, fullName }, content }, index) => {
            return (
              <Link
                to={"/profile/" + _id}
                className="bg-green-200 p-2 rounded-lg hover:bg-main duration-500 hover:scale-105 flex-row flex gap-x-4 w-full "
                key={index}
              >
                <img
                  src={AvatarUrl}
                  className="w-16 h-16 object-cover rounded-full  shadow-md"
                  alt={fullName + "img"}
                />
                <div className="">
                  <h2 className="text-lg">{fullName}</h2>
                  <p className="text-mainColor">{content}</p>
                </div>
              </Link>
            );
          }
        )}
      </div>
      {requests.map((req, index) => {
        return (
          <Request
            handleAccept={handleAccept}
            handleCanceled={handleCanceled}
            body={req}
            request
            key={index}
          />
        );
      })}
    </div>
  );
}

export default NotifcationNav;
