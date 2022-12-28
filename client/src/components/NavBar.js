import React, { useState } from "react";

function NavBar() {
  const [Active, setActive] = useState(false);

  return (
    <>
      <div className="bg-[#579BB1] absolute w-full  z-10 p-1 flex items-center">
        <div className="logo flex items-center px-4 grow">
          <img src="/images.png" className={"rounded-full w-14 h-14"} />
          <span className="text-3xl ml-2 font-bold uppercase font-mono text-[#F8F4EA]">
            can you
          </span>
        </div>
        <div
          onClick={() => setActive(!Active)}
          className=" cursor-pointer w-12 h-12 flex items-center justify-center bg-[#F8F4EA] text-[#579BB1] lg:hidden"
        >
          <i class="fa fa-bars text-2xl" aria-hidden="true"></i>
        </div>

        <div className="hidden lg:flex items-center">
          <input
            type={"search"}
            placeholder="search"
            className="rounded-full h-12 p-3 outline-none text-lg"
            spellCheck="false"
          />
          <img src="/images.png" className={" rounded-full w-14 h-14 m-1"} />
        </div>
      </div>
      <div
        className={`absolute h-screen lg:hidden  ${
          Active ? "-left-[100%]" : "w-full"
        }  z-0 bg-[#E1D7C6]`}
      ></div>
    </>
  );
}

export default NavBar;
