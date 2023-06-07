import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { PostRequest, getRequest } from "../utils/ProfileMethods";
import Select from "react-select";
import { useLocation } from "react-router-dom";
import { displayMsg } from "../validate/displayError";

const CoursesDashboard = () => {
  const title = useRef(null);
  const linkVideo = useRef(null);
  const descRef = useRef(null);
  const selectedPlaylistRef = useRef(null);
  const [availablePlayList, setAvailablePlayList] = useState([]);
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [data] = selectedPlaylistRef.current.getValue();
    console.log("first");
    const [res, err] = await PostRequest("/courses/create/subject", {
      title: title.current.value,
      link: linkVideo.current.value,
      desc: descRef.current.value,
      playListId: state?.playListId || data._id,
    });
    console.log(err);
    if (!err) displayMsg("uploaded successfully 👌👌", { type: "success" });
  };
  useEffect(() => {
    const getMyPlayList = async () => {
      const [data, err] = await getRequest("/courses/getMyPlayLists");
      if (!err) setAvailablePlayList(data);
    };

    if (!state?.playListId) {
      getMyPlayList();
    } else {
      setAvailablePlayList([
        {
          title: state?.title,
          _id: state?.playListId,
        },
      ]);
    }
  }, []);

  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col shadow-sm p-5 w-full lg:w-1/2  mt-8  mx-auto gap-6 bg-white rounded-lg"
        >
          <Select
            ref={selectedPlaylistRef}
            placeholder="Select playList"
            required={true}
            defaultValue={
              state ? [{ title: state?.title, _id: state._id }] : false
            }
            isDisabled={state ? true : false}
            getOptionLabel={(option) => option.title}
            getOptionValue={(option) => option._id}
            options={availablePlayList}
          />
          {/* title */}
          <input
            type="text"
            className="bg-gray-200 h-10 p-2"
            ref={title}
            placeholder="Enter title"
          />
          {/* video url */}
          <input
            type="text"
            className="bg-gray-200 h-10 p-2"
            ref={linkVideo}
            placeholder="Enter link"
          />

          {/*desc  */}
          <textarea
            ref={descRef}
            className="bg-gray-200 h-52 resize-none"
            maxLength={1400}
          ></textarea>
          {/*desc  */}
          <button className="main-btn px-10 py-2   rounded-md">submit</button>
        </form>
      </div>
    </>
  );
};

export default CoursesDashboard;
