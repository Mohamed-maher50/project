import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const RateStars = ({ handler }) => {
  const [activeStars, setactiveStars] = useState(-1);

  return (
    <div className="flex">
      <div
        key={0}
        onClick={() => {
          handler(0);
          setactiveStars(0);
        }}
        className={`cursor-pointer  duration-200 ${
          activeStars >= 0 ? "text-yellow-400" : ""
        }`}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        key={1}
        onClick={() => {
          handler(1);
          setactiveStars(1);
        }}
        className={`cursor-pointer  duration-200 ${
          activeStars >= 1 ? "text-yellow-400" : ""
        }`}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        key={2}
        onClick={() => {
          handler(2);
          setactiveStars(2);
        }}
        className={`cursor-pointer  duration-200 ${
          activeStars >= 2 ? "text-yellow-400" : ""
        }`}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        key={3}
        onClick={() => {
          handler(3);
          setactiveStars(3);
        }}
        className={`cursor-pointer  duration-200 ${
          activeStars >= 3 ? "text-yellow-400" : ""
        }`}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
      <div
        key={4}
        onClick={() => {
          handler(4);
          setactiveStars(4);
        }}
        className={`cursor-pointer  duration-200 ${
          activeStars >= 4 ? "text-yellow-400" : ""
        }`}
      >
        <FontAwesomeIcon icon={faStar} />
      </div>
    </div>
  );
};

export default RateStars;
