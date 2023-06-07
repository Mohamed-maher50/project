import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeProfilePicture } from "../store/user";
import { toast } from "react-toastify";
import { uploadImg } from "../components/miscellaneous";
import { asyncToast } from "../validate/displayError";
function Avatar() {
  const [img, setImg] = useState("/newUser.jpeg");
  const imgInput = useRef("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.userData);
  const handelFirstVisit = async () => {
    const res = await axios.put("/firstVisit");
    return res;
  };
  const nav = useNavigate();
  const submitAvatar = async (e) => {
    e.preventDefault();
    const createAsyncToast = asyncToast();
    uploadImg("userImg/", imgInput.current.files[0], {
      PCB: (p) => createAsyncToast("progress", p),
      cb: (data) => {
        dispatch(changeProfilePicture({ imgUrl: data }));
        createAsyncToast();
        nav(`/`);
      },
      cbError: () => createAsyncToast("error"),
    });
  };
  const handleUpload = (e) => {
    let imgUrl = URL.createObjectURL(e.target.files[0]);
    setImg(imgUrl);
  };
  useEffect(() => {
    if (user?.firstVisit === false) nav("/");
    return () => {
      handelFirstVisit();
    };
  }, []);
  const handleSkip = () => handelFirstVisit();

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-mainBlue">
      <form
        onSubmit={submitAvatar}
        className=" border-white border-8  bg-white shadow-lg p-4 pt-6 flex flex-col items-center w-[25rem] rounded-md"
      >
        <h1 className="text-lg text-stone-500">Choose you picture</h1>
        <label
          htmlFor="userImg"
          className="relative flex group w-32 h-32  my-2 cursor-pointer"
        >
          <img src={img} className=" shadow-md rounded-full object-cover" />
          <div className="w-full  scale-0 flex items-center justify-center group-hover:bg-white  duration-300 group-hover:scale-100 absolute rounded-full top-0 bottom-0 right-0   ">
            <FontAwesomeIcon
              icon={faEdit}
              className={"text-open w-10 h-10 block"}
            />
          </div>
        </label>
        <input
          id="userImg"
          onChange={handleUpload}
          ref={imgInput}
          type={"file"}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
        />
        <div className="flex justify-between w-full mt-9 items-center">
          <button
            type="submit"
            className="main-btn px-4 py-2 block rounded-md"
            onClick={submitAvatar}
          >
            Submit
          </button>
          <Link to={`/`} onClick={handleSkip}>
            <button
              type="submit"
              className="main-btn px-4 py-2 rounded-md outline-btn block ml-auto"
            >
              Skip
              <FontAwesomeIcon className="ml-2" icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Avatar;
