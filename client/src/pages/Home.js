import React from "react";
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
          <div className="h-[300vh] w-full bg-secondary p-4">
            <input
              className="bg-gray-200 w-full outline-none p-24 rounded-md duration-700 placeholder:text-black font-bold text-main focus:p-4 "
              placeholder="what you need ? "
              spellCheck="false"
            />
            <div className="grid grid-cols-3 gap-4 mt-3 text-main">
              <select defaultValue={true}>
                <option>c++</option>
              </select>
              <select defaultValue={true}>
                <option>filed</option>
              </select>
              <select defaultValue={true}>
                <option>c++</option>
              </select>
            </div>
          </div>
        </section>
        <section className="bg-secondary col-span-2 h-fit sticky top-0">
          <div>sklfad</div>
        </section>
      </div>
    </>
  );
}

export default Home;
