import React from "react";

function Layout({ children, isOpen, handler }) {
  return (
    <>
      {isOpen ? (
        <div
          className={`absolute shadow-lg    duration-1000 flex bottom-0 flex-col items-center justify-center w-full top-0 left-0 h-full bg-[#140029b3]`}
        >
          <div
            onClick={handler}
            className=" text-white absolute  top-2 right-10 main-btn px-3 text-center text-xl cursor-pointer rounded  bg-secondary"
          >
            <i className="fa-solid fa-xmark "></i>
          </div>

          {children}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Layout;
