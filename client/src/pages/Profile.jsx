import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreatePost from "../components/CreatePost/CreateBox";
import NavBar from "../components/NavBar";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Post from "../components/Post/PostBox";
import SkillsBar from "../components/miscellaneous/SkillsBar";

import { PostRequest, getRequest } from "../utils/ProfileMethods";

function Profile() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(undefined);
  const { user } = useSelector((state) => state.user.userData);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/profile/${id}`);
      setCurrentUser(data);
    };
    fetchUser();
    const fetchPosts = async () => {
      const [data] = await getRequest(`/posts/${id}`);
      data && setMyPosts(data?.posts);
    };
    fetchPosts();
  }, [id, user]);
  const addPost = async (values) => {
    const [data, err] = await PostRequest("/createPost", values);
    if (!err) setMyPosts((prev) => [data, ...prev]);
  };

  return (
    <>
      <NavBar />
      <div className="w-[90%]  mx-auto">
        <div className="relative   grid gap-24 pt-4 row-span-3 grid-cols-5  text-white">
          {id == user._id && (
            <div className="order-2   md:order-1 col-span-5 md:col-span-4 lg:col-span-3">
              <CreatePost addPost={addPost} />
            </div>
          )}

          <div
            className={`flex ${
              id == user._id ? "" : ""
            } order-1 flex-col col-span-5  md:col-span-4 row-span-3  lg:col-span-2 `}
          >
            <div className=" col-span-2 row-span-3 w-full">
              <ProfileCard />
              <div className="w-full my-3  bg-white shadow-md rounded-lg">
                <SkillsBar currentUser={currentUser} />
              </div>
            </div>
          </div>
          <div className=" order-3 col-span-5 lg:col-span-3">
            {myPosts?.map((p, index) => (
              <Post post={p} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
