import React from "react";
import NavBar from "../components/NavBar";
import CoursesSearch from "../components/coursesSearch/CoursesSearch";
import { TopicLink } from "../components/topic/Topic";
import { useNavigate } from "react-router-dom";
const Courses = () => {
  const nav = useNavigate();
  return (
    <>
      <NavBar />
      <h1
        className="ml-10 text-mainBlue underline cursor-pointer"
        onClick={() => nav(-1)}
      >
        Go Back
      </h1>
      <div className="grid grid-cols-12 gap-3 p-4">
        <div className="col-span-full md:col-span-3 flex flex-col gap-4 bg-white p-3 shadow-md">
          <TopicLink label={"create Playlist"} route={"create/playlist"} />
          <TopicLink label={"update Playlist"} route={"/courses/dashboard"} />
        </div>
        <div className="col-span-full flex flex-col gap-y-5 md:col-span-6">
          <CoursesSearch />
        </div>
        <div className="col-span-3"></div>
      </div>
    </>
  );
};

export default Courses;
