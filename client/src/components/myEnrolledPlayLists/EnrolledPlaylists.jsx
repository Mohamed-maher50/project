import React, { useEffect, useState } from "react";
import { getRequest } from "../../utils/ProfileMethods";
import { Link } from "react-router-dom";

const EnrolledPlaylists = () => {
  const [myEnrolledPlayLists, setMyEnrolledPlayLists] = useState([]);
  useEffect(() => {
    getRequest("courses/enrolled/playlist").then(([data, err]) => {
      if (!err) setMyEnrolledPlayLists(data);
    });
  }, []);

  return (
    <div>
      {myEnrolledPlayLists.length == 0 ? (
        <Link
          to={"/courses"}
          className="text-mainBlue p-2 underline underline-offset-2 my-1 block"
        >
          Check Courses
        </Link>
      ) : (
        myEnrolledPlayLists.map((pl, index) => {
          return (
            <Link
              to={`/courses/view/${pl._id}`}
              key={index}
              className="flex text-start bg-main mb-3 rounded-md shadow-md cursor-pointer p-4"
            >
              <img
                src={pl.coverImg}
                className="w-14 rounded-full h-14 object-cover"
              />
              <div className="  ml-1 overflow-hidden">
                <h1 className="font-[900] overflow-hidden text-ellipsis whitespace-nowrap ">
                  {pl.title}
                </h1>
                <p className="overflow-hidden text-sm text-ellipsis whitespace-nowrap ">
                  {pl.desc}
                </p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default EnrolledPlaylists;
