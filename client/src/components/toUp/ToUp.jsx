import React, { useEffect, useState } from "react";

function ToUp() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use'auto'behaviour
         in place of'smooth'*/
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      {visible && (
        <div
          className="p-3 rounded-lg cursor-pointer absolute z-50 bg-open bottom-11 right-20"
          onClick={scrollToTop}
        >
          Up
        </div>
      )}
    </>
  );
}

export default ToUp;
