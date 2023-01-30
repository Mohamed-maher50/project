import React from "react";
import PostBox from "../components/AddPost/PostBox";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <>
      <NavBar />
      <div className="grid relative text-center  gap-4 grid-cols-10 text-white">
        <section className="bg-secondary col-span-2 h-fit sticky top-0">
          profile
        </section>
        <section className="bg-secondary col-span-6 relative ">
          <PostBox />
        </section>
        <section className="bg-secondary col-span-2 h-fit sticky top-0">
          <div>sklfad</div>
        </section>
      </div>
    </>
  );
}

export default Home;
