import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import { SkillButton } from "./smallComponents/skillsButton";
function Post({ posts }) {
  if (!posts) return <div>loading</div>;
  return (
    <>
      {posts.map((p) => {
        return (
          <article
            key={p._id}
            className="w-full p-3 my-4 bg-white shadow-lg  shadow-slate-200"
          >
            <div className="mt-4">
              <header>
                <div className="flex items-center w-full">
                  <div className="flex items-center  justify-end w-full">
                    <h2 className="text-open text-end mx-2 text-xl font-semibold capitalize">
                      {p.author.fullName}
                      <span className="text-gray-400 mt-1  font-mono  text-sm block">
                        {new Date(p.createdAt).toLocaleString()}
                      </span>
                    </h2>
                    <div className="rounded-full h-16 w-16 ">
                      <img
                        src={p.author.AvatarUrl}
                        width="100%"
                        className="w-[60px] h-[60px] object-cover rounded-full"
                        alt="userImage"
                      />
                    </div>
                  </div>
                </div>
              </header>
              <div className="flex justify-end my-2">
                {p.skills?.map((sk, indexSkill) => {
                  return <SkillButton skill={sk} key={indexSkill} />;
                })}
              </div>
              <section className="my-4 ">
                <img
                  src="/logo.png"
                  className="w-full  object-cover"
                  alt="logo"
                />
              </section>
              <footer className="text-white py-3  flex">
                <span className=" bg-blue-600 hover:scale-150 hover:-rotate-12 duration-500  h-1 w-1 p-3 cursor-pointer flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faThumbsUp} />
                </span>
                <span className=" bg-red-600 w-4 h-4 p-3 hover:scale-150 mx-1 duration-500 cursor-pointer flex items-center justify-center rounded-full">
                  <FontAwesomeIcon icon={faHeart} />
                </span>

                <span className="text-gray-600 font-bold text-lg">8k</span>
              </footer>
            </div>
          </article>
        );
      })}
    </>
  );
}

export default Post;
