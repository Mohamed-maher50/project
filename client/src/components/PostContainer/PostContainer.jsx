import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Post from "../Post/PostBox";
import {
  PostRequest,
  getRequest,
  putRequest,
} from "../../utils/ProfileMethods";
import CreatePost from "../CreatePost/CreateBox";

function PostContainer() {
  const { user } = useSelector((state) => state.user.userData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getallPosts = async () => {
      const [data, err] = await getRequest("/getPosts");
      if (!err) setPosts(data);
    };
    getallPosts();
  }, []);
  const addLike = async (id) => {
    const [data, err] = await putRequest(`/posts/likes/${id}`);
    if (!err) {
      const clone = posts.map((p) => {
        if (p._id != id) return p;
        if (!p.likes.includes(user._id)) {
          p.likes.push(user._id);
          return p;
        }
        p.likes = p.likes.filter((userId) => userId != user._id);
        return p;
      });
      setPosts(clone);
    }
  };
  const addComment = async (id, content) => {
    console.log(content);
    const [data, err] = await PostRequest(`/posts/comments/${id}`, {
      content,
    });

    if (!err) {
      setPosts((prev) => {
        return prev.map((p) => {
          if (p._id == id) {
            p.comments.push(data);
            return p;
          }
          return p;
        });
      });
    }
  };
  const addPost = async (values) => {
    const [data, err] = await PostRequest("/createPost", values);
    if (!err) setPosts((prev) => [data, ...prev]);
  };
  return (
    <>
      <CreatePost addPost={addPost} />
      <div className="mt-10">
        {posts?.map((pt, index) => (
          <Post
            post={pt}
            key={index}
            addLike={addLike}
            addComment={addComment}
          />
        ))}
      </div>
    </>
  );
}

export default PostContainer;
