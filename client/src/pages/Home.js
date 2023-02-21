import React from "react";
import PostBox from "../components/AddPost/PostBox";
import NavBar from "../components/NavBar";

import PostContainer from "../components/PostContainer/PostContainer";
import ProfileCard from "../components/ProfileCard/ProfileCard";

function Home() {
  return (
    <>
      <NavBar />
      <div className="pt-12">
        <div className="grid relative text-center gap-3 grid-cols-2  lg:grid-cols-10 text-white">
          <section className=" rounded-lg grid-cols-5 lg:col-span-2 h-fit lg:sticky top-12">
            <ProfileCard />
          </section>
          <section className=" rounded-lg order-last lg:order-none col-span-2 lg:col-span-6 relative  ">
            <PostBox />
            <PostContainer />
          </section>
          <section className=" rounded-lg grid-cols-5 lg:col-span-2 h-fit lg:sticky top-0">
            suhhh
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
