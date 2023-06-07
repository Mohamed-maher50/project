import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PostSkeleton } from "./Skeleton";
import { useDispatch } from "react-redux";
import { formatNumbers } from "../../utils/formatNumbers";
import { pushChildren } from "../../store/Layout";
import Comments from "../comments/Comments";
var i = 0;
function Post({ post, addLike, addComment }) {
  const comment = useRef("");
  const dispatch = useDispatch();
  const [imgNotFound, setImageNotFound] = useState(false);
  const showComments = () => {
    let CommentElem = post.comments.map((com, index) => {
      return <Comments cm={com} key={index} />;
    });
    dispatch(
      pushChildren(
        <div
          className="  border border-transparent bg-main rounded-lg overflow-y-auto "
          key={i++}
        >
          {CommentElem}
        </div>
      )
    );
  };

  if (!post) return <PostSkeleton />;
  return (
    <>
      <article className="w-full mx-auto p-3 my-4 bg-white shadow-lg border-b-4 border-secondary">
        <div className="mt-4">
          <header>
            <div className="flex items-center w-full">
              <div className="flex items-center  justify-end w-full">
                <h2 className="text-mainColor text-end mx-2 text-xl font-semibold capitalize">
                  {post.author.fullName}
                  <span className="text-gray-400 mt-1  font-mono  text-sm block">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </h2>

                <div className="rounded-full h-16 w-16 ">
                  <img
                    src={post.author.AvatarUrl}
                    width="100%"
                    className="w-[60px] h-[60px] object-cover rounded-full"
                    alt="userImage"
                  />
                </div>
              </div>
            </div>
          </header>
          <p className="text-mainColor text-start capitalize text-xl">
            {post.title}
          </p>
          {post.imgBody && (
            <section className="my-4 w-full">
              {!imgNotFound && (
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    setImageNotFound(true);
                  }}
                  src={post.imgBody}
                  className="w-full object-cover pointer-events-none"
                />
              )}
            </section>
          )}

          <footer className=" py-3  ">
            <div className="flex">
              <div className="flex items-center">
                <span className=" bg-red-600 w-4 h-4 p-3 text-white hover:scale-150 mx-1 duration-500 cursor-pointer flex items-center justify-center rounded-full">
                  <FontAwesomeIcon
                    icon={faHeart}
                    onClick={() => addLike(post._id)}
                  />
                </span>
                <span className="text-gray-600 font-bold text-lg">
                  {formatNumbers(post?.likes?.length)}
                </span>
              </div>
              <div className="w-full flex h-12 rounded-lg overflow-hidden">
                <input
                  type={"text"}
                  spellCheck="false"
                  ref={comment}
                  placeholder="enter comment"
                  className="w-full text-black rounded-l-lg outline-none pl-2 ml-2 "
                />
                <div
                  onClick={() => addComment(post._id, comment.current.value)}
                  className=" flex items-center px-4 hover:bg-slate-200 hover:text-mainColor duration-700 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faArrowRight} className=" h-5" />
                </div>
              </div>
            </div>
          </footer>

          <div className="bg-gray-400 cursor-pointer" onClick={showComments}>
            show comment
          </div>
        </div>
      </article>
    </>
  );
}

export default React.memo(Post);
