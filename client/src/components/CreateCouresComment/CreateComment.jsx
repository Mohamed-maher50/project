import React, { useCallback, useRef, useState } from "react";
import RateStars from "../miscellaneous/RateStars";
import { useParams } from "react-router-dom";
import { displayMsg } from "../../validate/displayError";
import { PostRequest } from "../../utils/ProfileMethods";

const CreateComment = ({ subjectId }) => {
  const comment = useRef();
  const { id } = useParams();
  const [rateStars, setRateStars] = useState(0);

  const handleRate = (index) => {
    setRateStars(index);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectId) return;
    const [data, err] = await PostRequest(`/courses/addComment/${subjectId}`, {
      stars: rateStars,
      feedBack: comment?.current.value,
    });
    if (!err) displayMsg("success 👌", { type: "success" });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-y-3 p-2 shadow-md bg-white rounded"
    >
      <textarea
        className="w-full p-2 outline-none resize-none h-32 overflow-auto "
        placeholder="Enter Your Message"
        ref={comment}
      ></textarea>
      <RateStars handler={handleRate} />
      <button className="main-btn px-4 rounded-md py-2">Submit</button>
    </form>
  );
};

export default CreateComment;
