import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import authConfig, { config } from "../config";
function Avatar() {
  const [img, setImg] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const { user, token } = useSelector((state) => state.user.userData);
  const handelFirstVisit = async () => {
    const res = await axios.put(
      "http://localhost:4000/firstVisit",
      authConfig(token)
    );
  };
  const nav = useNavigate();
  const submitAvatar = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:4000/avatar",
        {
          AvatarURL: selectedAvatar,
          ...{ user, token },
        },
        config
      );
      localStorage.setItem("userInfo", data);
      handelFirstVisit();
      nav("/home");
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (index) => {
    setSelectedAvatar(img[index.realIndex]);
  };
  useEffect(() => {
    if (user?.firstVisit === false) nav("/home");
    if (img.length === 0) {
      var imgs = [];
      for (var i = 0; i < 5; i++) {
        imgs.push(
          `https://api.multiavatar.com/${Math.round(Math.random() * 100)}.png`
        );
      }
      setSelectedAvatar(imgs[0]);
      setImg(imgs);
    }
    return () => {
      handelFirstVisit();
    };
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-main">
      <div className=" border-white border-8  p-4 pt-6 flex flex-col items-center w-[25rem] rounded-md">
        <div className="w-[150px] h-64">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            modules={[Navigation]}
            navigation
            pagination={{ clickable: true }}
            loop
            onSlideChange={handleChange}
          >
            {img.map((img, index) => {
              return (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`avatar${index}`}
                    width={"100%"}
                    loading="lazy"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex justify-between w-full">
          <button
            type="submit"
            className="main-btn block mr-auto"
            onClick={submitAvatar}
          >
            Submit
          </button>
          <Link to={"/home"}>
            <button type="submit" className="outline-btn   block ml-auto">
              Skip
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
