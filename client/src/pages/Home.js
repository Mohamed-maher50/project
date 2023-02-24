import React from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost/PostBox";
import NavBar from "../components/NavBar";
import OnlineFriends from "../components/OnlineFriends/OnlineFriends";

import PostContainer from "../components/PostContainer/PostContainer";
import ProfileCard from "../components/ProfileCard/ProfileCard";

function Home() {
  const { user, token } = useSelector((state) => state.user.userData);
  return (
    <>
      <NavBar />
      <div className="pt-12">
        <div className="grid relative text-center gap-3 grid-cols-2  lg:grid-cols-8 text-white">
          <section className="hidden lg:block rounded-lg  lg:col-span-2 h-fit lg:sticky top-0">
            <ProfileCard home />
          </section>
          <section className="rounded-lg  mx-auto order-last lg:order-none col-span-2 lg:col-span-4  relative  ">
            <CreatePost />
            <div className="w-[90%] mx-auto sm:w-[65%] lg:w-[85%]">
              <PostContainer />
            </div>
          </section>
          <section className="bg-open hidden lg:block p-3 shadow-lg rounded-lg  grid-cols-5 lg:col-span-2 h-fit lg:sticky top-0">
            <OnlineFriends user={user} />
            <OnlineFriends user={user} />
            <OnlineFriends user={user} />
            <OnlineFriends user={user} />
            <OnlineFriends user={user} />
            <OnlineFriends user={user} />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
