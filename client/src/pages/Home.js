import React from "react";
import NavBar from "../components/NavBar";

function Home({ notifcationStatusHandler }) {
  return (
    <>
      <NavBar notifcationStatusHandler={notifcationStatusHandler} />
      <div>hello</div>
    </>
  );
}

export default Home;
