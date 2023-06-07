import React from "react";
import { Link } from "react-router-dom";
const TopicLink = ({ route, label }) => {
  return (
    <Link
      to={route}
      className="py-2 px-6 main-btn  text-start underline rounded-xl  shadow"
    >
      {label}
    </Link>
  );
};
const Topic = () => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 flex md:flex-col gap-2 justify-start text-mainColor">
      <span className="self-start underline underline-offset-8 text-xl">
        Pages
      </span>
    </div>
  );
};

export { Topic, TopicLink };
