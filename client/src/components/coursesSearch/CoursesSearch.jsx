import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { PostRequest } from "../../utils/ProfileMethods";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CoursesSearch = () => {
  const [loading, setLoading] = useState(false);
  const [Courses, setCourses] = useState([]);
  const SearchRef = useRef(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const [data, err] = await PostRequest(
      `/courses/search/playLists?playLists=${SearchRef?.current.value}`
    );
    if (!err) setCourses(data);
    setLoading(false);
  };
  return (
    <>
      <form
        onSubmit={handleSearch}
        className="bg-white h-10 flex rounded-md shadow overflow-hidden"
      >
        <input
          ref={SearchRef}
          type="search"
          className="h-full grow pl-3 outline-none"
          placeholder="Search on your course"
        />
        <button className="main-btn px-3" type="submit">
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Search"}
        </button>
      </form>
      <div className=" grid gap-5 grid-cols-2">
        {Courses.map((cs) => {
          return (
            <Link
              to={`/course/Enroll/${cs._id}`}
              key={cs._id}
              className="flex gap-3 flex-col cursor-pointer rounded-md shadow-md overflow-hidden"
            >
              <img
                src={cs.coverImg}
                height={"200px"}
                className="overflow-hidden w-full object-cover h-[250px]"
              />
              <div className="p-2">
                <h2 className="text-xl text-slate-900   capitalize">
                  {cs.title.length > 70
                    ? cs.title?.slice(0, 70) + "...."
                    : cs.title}
                </h2>
                <p className="text-sm max-h-28 overflow-hidden text-slate-500">
                  {cs.desc.length > 70
                    ? cs.desc?.slice(0, 70) + "...."
                    : cs.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CoursesSearch;
