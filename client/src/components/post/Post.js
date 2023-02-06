import React from "react";
import { useSelector } from "react-redux";
import { SkillButton } from "../smallComponents/skillsButton";

function Post() {
  const { posts } = useSelector((state) => state.posts);
  return (
    <div className="w-full">
      {posts.map((userPost) => {
        if (userPost.posts.length != 0) {
          return userPost.posts.map((post) => {
            return (
              <div className=" bg-main m-3 flex flex-col items-center p-3">
                <img
                  src={userPost.AvatarUrl}
                  alt={userPost.fullName}
                  className="w-[80px]"
                />
                <h1>{userPost.fullName}</h1>
                <p>{post.title}</p>
                <div>
                  {post.skills.map((sk) => {
                    return <SkillButton skill={sk} randomColor />;
                  })}
                </div>
              </div>
            );
          });
        }
      })}
    </div>
  );
}

export default Post;
