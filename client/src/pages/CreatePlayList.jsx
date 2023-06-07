import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { storage } from "../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { displayMsg } from "../validate/displayError";
import { useNavigate } from "react-router-dom";
import { PostRequest } from "../utils/ProfileMethods";
import { toast } from "react-toastify";
import NavBar from "../components/NavBar";
const CreatePlayList = () => {
  const Title = useRef(null);
  const description = useRef(null);
  const imgInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submitAvatar = async (e) => {
    e.preventDefault();

    if (!Title?.current.value) return displayMsg("Enter title");
    if (!description?.current.value) return displayMsg("Enter description");
    if (!imgInput?.current.files[0]) return displayMsg("upload image");

    setLoading(true);
    const id = toast.loading("Please wait...", {
      theme: "light",
      type: "info",
      position: "bottom-right",
    });
    //

    const img = ref(storage, "images/cover/" + Date.now());

    const uploadTask = uploadBytesResumable(img, imgInput?.current.files[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        toast.update(id, {
          render: Math.floor(progress) + "%",
        });
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const [data, err] = await PostRequest("/courses/create/playlist", {
            coverImg: downloadURL,
            desc: description?.current.value,
            title: Title?.current.value,
          });

          toast.update(id, {
            render: "All is good",
            type: "success",

            isLoading: false,
            autoClose: 2000,
          });

          if (!err) {
            nav("/courses/dashboard", {
              replace: true,
              state: {
                _id: data._id,
                title: Title?.current.value,
              },
            });
          }
        });
      }
    );
    setLoading(false);
  };
  return (
    <>
      <NavBar />
      <form
        onSubmit={submitAvatar}
        className="flex p-4 rounded-md mt-10 bg-white text-mainBlue flex-col gap-y-3 w-1/2 mx-auto"
      >
        {/* cover */}
        <label
          htmlFor="Upload"
          className="text-4xl w-fit mx-auto  border-2 border-mainBlue cursor-pointer  p-5 rounded-md"
        >
          <FontAwesomeIcon icon={faUpload} />
        </label>
        <input
          type="file"
          id="Upload"
          ref={imgInput}
          className="hidden"
          accept="image/png, image/gif, image/jpeg"
          placeholder="upload img"
        />
        {/* title of playlist */}
        <div className="flex gap-y-3 flex-col w-full mx-auto">
          <input
            type="text"
            ref={Title}
            placeholder="Enter Title"
            className="h-11 pl-2 bg-main"
          />

          <textarea
            type="text"
            ref={description}
            placeholder="Enter Description"
            className="h-11 pl-2 bg-main max-h-96 min-h-[300px]"
            maxLength={1000}
          />
          <button
            type="submit"
            className="main-btn px-5 mx-auto py-2 rounded-md"
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreatePlayList;
