import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../utils/ProfileMethods";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faDisplay,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { putRequest } from "../utils/ProfileMethods";
const DetailsItems = ({ value, className, children }) => {
  return (
    <h1 className={`text-lg  text-mainColor font-rob  ${className}`}>
      <span className="text-md lowercase">{value}</span>
      {children}
    </h1>
  );
};
const EnrollCourse = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    const getCourse = async () => {
      const [data, err] = await getRequest(`/courses/getPlaylist/${id}`);
      if (!err) setPlaylist(data);
    };
    getCourse();
  }, [id]);
  const handleEnroll = async () => {
    const [data, err] = await putRequest(`/courses/enroll/playLists/${id}`);
    if (!err) nav(`/courses/view/${id}`);
  };
  return (
    <>
      <NavBar />
      <div className=" container gap-8 mx-auto p-6 grid md:grid-cols-2 bg-white shadow-sm mt-11">
        <img
          src={playlist && playlist.coverImg}
          className="w-[600px] h-[300px] object-cover outline-gray-300 shadow outline outline-offset-8 outline-2 "
          alt={playlist?.title}
        />
        <div className="capitalize flex flex-col gap-y-2">
          <DetailsItems
            value={playlist?.title}
            className={"capitalize text-md font-[500] "}
          />
          <DetailsItems value={playlist?.desc} className={"capitalize "} />
          <DetailsItems
            className={"text-sm"}
            value={playlist?.author.fullName}
          />
          <DetailsItems value={playlist?.videos.length}>
            <span className="ml-2  text-gray-400">
              <FontAwesomeIcon icon={faDisplay} />
            </span>
          </DetailsItems>
          <DetailsItems value={playlist?.students.length} className={""}>
            <span className="ml-2  text-gray-400">
              <FontAwesomeIcon icon={faUsers} />
            </span>
          </DetailsItems>
          <div className="flex justify-between w-full mt-auto">
            <button
              className="main-btn px-9 py-2"
              type="button"
              onClick={() => nav(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="main-btn px-9 py-2"
              onClick={handleEnroll}
              type="button"
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnrollCourse;
