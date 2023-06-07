import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { PostRequest, getRequest, putRequest } from "../utils/ProfileMethods";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import CreateComment from "../components/CreateCouresComment/CreateComment";
const ViewCourse = () => {
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [indexVideo, setIndexVideo] = useState(0);
  const { user } = useSelector((state) => state.user.userData);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const nav = useNavigate();
  const getComment = async (id) => {
    const [data, err] = await getRequest(`/courses/comments/${id}`);
    if (!err) setComments(data);
  };
  useEffect(() => {
    const getContent = async () => {
      const [data, err] = await getRequest(`/courses/getSubject/${id}`);
      if (!err) setVideos(data);
      else nav(-1);
      return data;
    };
    getContent();
  }, [id]);
  useEffect(() => {
    if (videos[indexVideo]) getComment(videos[indexVideo]._id);
  }, [indexVideo, videos]);
  const end = async () => {
    const [data, err] = await putRequest(
      `/courses/completed/${videos[indexVideo]?._id}`
    );
    if (!err) {
      setIndexVideo(indexVideo + 1);
    }
  };
  console.log("render");
  return (
    <>
      <NavBar />
      <div className="grid grid-cols-9   gap-5 p-5">
        <div className=" col-span-full flex flex-col justify-end  lg:justify-start md:h-full md:col-span-4 order-3 lg:order-1 lg:col-span-2">
          <div className="w-full">
            {comments.map((cm) => {
              return <div>{cm.feedBack}</div>;
            })}
          </div>
          <CreateComment subjectId={videos[indexVideo]?._id} />
        </div>
        <div className=" col-span-full flex justify-center items-center lg:order-2  shadow-xl lg:col-span-5">
          {loadingVideo || <img src={"/Pulse-1.9s-200px.gif"} />}
          <ReactPlayer
            width={!loadingVideo ? "0%" : "100%"}
            height={"400px"}
            config={{
              youtube: {
                playerVars: { showinfo: 1 },
              },
            }}
            onReady={() => {
              setLoadingVideo(true);
            }}
            controls
            onEnded={end}
            url={videos[indexVideo]?.link}
          />
        </div>
        <div className=" col-span-full md:col-span-5 grid gap-2 h-fit rounded-md lg:order-3 lg:col-span-2 px-3">
          <h1 className=" text-center mb-3 border-mainBlue border-b-2 text-mainBlue text-2xl underline-offset-5">
            Content
          </h1>
          {videos.map((v, index) => {
            return (
              <div
                onClick={() => setIndexVideo(index)}
                key={index}
                className=" justify-between flex items-center cursor-pointer hover:bg-mainBlue duration-500 rounded-md hover:text-white  p-3 bg-white shadow-md overflow-hidden w-full whitespace-nowrap"
              >
                {v?.completed.includes(user._id) && (
                  <span className="w-4 rounded-full  flex justify-center h-4 p-1 bg-blue-400">
                    <FontAwesomeIcon
                      className=" text-sm text-white"
                      icon={faCheck}
                    />
                  </span>
                )}

                <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {v.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ViewCourse;
