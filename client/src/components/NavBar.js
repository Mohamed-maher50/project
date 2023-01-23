import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function NavBar({ notifcationStatusHandler }) {
  const [Active, setActive] = useState(true);
  const { user } = useSelector((state) => state.user);
  const SubMenu = function () {
    return (
      <div className="flex ml-auto w-full">
        <input
          type={"search"}
          placeholder="search"
          className="rounded-full h-10 p-2 outline-none text-lg grow shadow"
          spellCheck="false"
        />
        <Link to={`/profile/${user?._id}`} className="flex ">
          <span className="rounded-full cursor-pointer border-secondary border-2 outline-2 outline-offset-2 outline-none outline-lime-50 overflow-hidden inline-block w-10 h-10 mx-3">
            <img src={user.AvatarUrl} />
          </span>
        </Link>
      </div>
    );
  };
  return (
    <>
      <div className="bg-main top-0 shadow-md shadow-black  w-full relative z-20 p-1 flex items-center overflow-hidden">
        <div className="logo flex items-center px-4 ">
          <img
            src="/images.png"
            className={"rounded-full w-12 h-12"}
            alt="logo"
          />
          <span className="text-2xl ml-2 font-bold uppercase font-mono text-[#F8F4EA]">
            can you
          </span>
        </div>
        <i
          className={`fa-solid fa-bell ml-auto text-yellow-400 text-2xl mx-1 cursor-pointer`}
          onClick={notifcationStatusHandler}
        ></i>
        <div
          onClick={() => setActive(!Active)}
          className=" cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg bg-[#F8F4EA] text-[#579BB1] lg:hidden"
        >
          <i
            className="fa fa-bars text-2xl p-4  text-main"
            aria-hidden="true"
          ></i>
        </div>

        <div className="hidden lg:flex items-center w-80 ">
          <SubMenu />
        </div>
      </div>
      <div
        className={`fixed h-screen flex justify-center lg:hidden pt-24 z-10 ${
          Active ? "-left-[100%]" : "w-full"
        }   bg-main`}
      >
        <div className="flex w-full px-8 md:px-24 h-fit items-center ml-auto">
          <SubMenu />
        </div>
      </div>
    </>
  );
}

export default NavBar;
