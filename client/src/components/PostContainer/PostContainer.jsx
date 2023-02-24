import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../store/postReducer";
import { PostRequest } from "../../utils/ProfileMethods";
import Post from "../ProfilePost";

function PostContainer() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user.userData);
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    const getallPosts = async () => {
      let data = await dispatch(getPosts(token));
    };

    getallPosts();
  }, []);
  console.log(posts);
  return (
    <>
      <Post posts={posts} />
    </>
  );
}

export default PostContainer;
