import React from "react";
import {
  faCheck,
  faPenToSquare,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Layout({ children, isOpen, handler }) {
  return (
    <>
      {isOpen ? (
        <div
          className={`absolute shadow-lg  duration-1000 flex bottom-0 flex-col items-center justify-center w-full top-0 left-0 h-full bg-[#140029b3]`}
        >
          <div
            onClick={handler}
            className=" text-white absolute  top-2 right-10 main-btn px-3 text-center text-xl cursor-pointer rounded  bg-open"
          >
            <FontAwesomeIcon icon={faXmark} />
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
