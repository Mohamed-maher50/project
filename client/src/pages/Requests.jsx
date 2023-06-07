import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Requestbox from "../components/requestBox/Requestbox";
import { getRequest } from "../utils/ProfileMethods";
import { Request } from "../components/notificationItem/NotifictItem";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getRequests = async () => {
      var [data, err] = await getRequest("/api/getNotifications");
      if (!err) {
        data && setRequests(data);
      }
    };
    getRequests();
  }, []);
  return (
    <>
      <NavBar />
      <div className="grid md:grid-cols-5 gap-7 p-5">
        <div className="col-span-5 md:col-span-2">
          <Requestbox />
        </div>
        <div className=" w-full shadow-sm col-span-5 md:col-span-3 rounded-lg bg-mainBlue  h-96 overflow-y-auto p-2 mx-auto text-white">
          <div>
            {requests.map((req, index) => {
              return <Request body={req} request key={index} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
