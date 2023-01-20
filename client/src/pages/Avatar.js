import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";

function Avatar() {
  const [img, setImg] = useState([]);

  const handleChange = (index) => {
    console.log(img[index.realIndex]);
  };
  useEffect(() => {
    if (img.length == 0) {
      var imgs = [];
      for (var i = 0; i < 5; i++) {
        imgs.push(
          `https://api.multiavatar.com/${Math.round(Math.random() * 100)}.png`
        );
      }
      setImg(imgs);
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center flex-col bg-[#20023e]">
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
                  <img src={img} alt="avatar" width={"100%"} loading="lazy" />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="flex justify-between w-full">
          <button type="submit" className="main-btn block mr-auto">
            Submit
          </button>
          <button type="submit" className="outline-btn   block ml-auto">
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default Avatar;
