import React, { useRef, useState } from "react";
import { PostRequest } from "../../utils/ProfileMethods";
import { checkLang } from "../../utils/isLang";
import { asyncToast, displayMsg } from "../../validate/displayError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { uploadImg } from "../miscellaneous";
function CreatePost({ addPost }) {
  const [dir, setDir] = useState(false);
  const title = useRef("");
  const bodyImgRef = useRef();
  const [imgBody, setImgBody] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const createProgress = asyncToast();
    let url = await uploadImg(
      "posts/" + new Date(),
      bodyImgRef.current.files[0],
      {
        PCB: (progress) => {
          createProgress("progress", progress);
        },
        cb: () => createProgress(),
        cbError: () => createProgress("error"),
      }
    );
    addPost({
      title: title.current.value,
      imgBody: url,
    });

    setImgBody("");
  };
  const langDir = (e) => {
    if (checkLang(e.target.value) != dir) {
      setDir(!dir);
    }
  };
  const handleChange = (e) => {
    let imgUrl = URL.createObjectURL(e.target.files[0]);
    setImgBody(imgUrl);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full rounded-lg bg-white shadow-md  p-4 "
    >
      <textarea
        className="  p-5 w-full text-mainColor resize-none  outline-none rounded-md min-h-[200px] bg-main font-bold"
        placeholder="what you need ? "
        spellCheck="false"
        ref={title}
        onChange={langDir}
        dir={dir ? "rtl" : "ltr"}
      />
      <label
        htmlFor="postImage"
        className="flex cursor-pointer my-3 items-center mx-auto w-fit"
      >
        <span className="mr-2 text-mainColor">choose Image</span>
        <FontAwesomeIcon className="text-mainBlue text-3xl" icon={faImage} />
      </label>
      <input
        id="postImage"
        accept="image/png, image/gif, image/jpeg"
        type="file"
        className="hidden"
        ref={bodyImgRef}
        onChange={handleChange}
      />
      {imgBody && (
        <div className="relative flex ">
          <img
            src={imgBody}
            className="w-32 h-32  object-cover relative top-0 left-0 rounded-md shadow-md "
          />

          <span
            onClick={() => setImgBody("")}
            className="relative cursor-pointer text-red-600 text-xl  duration-300 hover:scale-150 h-fit -translate-x-4 top-0 left-0 "
          >
            <FontAwesomeIcon icon={faClose} />
          </span>
        </div>
      )}
      <button
        className=" p-2 main-btn px-5 rounded-full m-auto block  capitalize"
        onClick={handleSubmit}
      >
        submit
      </button>
    </form>
  );
}

export default CreatePost;
