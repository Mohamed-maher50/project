import React from "react";
import { useSelector } from "react-redux";
import { SkillButton } from "../smallComponents/skillsButton";

function Post() {
  const { posts } = useSelector((state) => state.posts);
  console.log(posts);
  return (
    <div className="w-full">
      {posts.map(({ post }, index) => {
        return (
          <div
            className=" bg-white  shadow-lg shadow-darkWhite m-3 flex flex-col items-center p-3"
            key={index}
          >
            <img
              src={post.author[0].AvatarUrl}
              alt={post.author[0].fullName}
              className="w-[80px] object-cover"
            />
            <h1>{post.author[0].fullName}</h1>
            <p>{post.title}</p>
            <div>
              {post.skills.map((sk, indexSkill) => {
                return <SkillButton skill={sk} randomColor key={indexSkill} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Post;
