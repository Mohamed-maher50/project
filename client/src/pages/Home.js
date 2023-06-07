import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreatePost from "../components/CreatePost/CreateBox";
import NavBar from "../components/NavBar";
import OnlineFriends from "../components/OnlineFriends/OnlineFriends";
import PostContainer from "../components/PostContainer/PostContainer";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import Requestbox from "../components/requestBox/Requestbox";
import Topic, { TopicLink } from "../components/topic/Topic";
import EnrolledPlaylists from "../components/myEnrolledPlayLists/EnrolledPlaylists";

function Home() {
  const { user } = useSelector((state) => state.user.userData);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const { data } = await axios.get("/getFriends");
        setOnlineFriends(data.following);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, []);
  return (
    <>
      <NavBar />
      <div className="pt-12">
        <div className="grid py-5 relative text-center gap-3    grid-cols-8 ">
          <section className="gap-3 col-span-8 lg:block rounded-lg  lg:col-span-2 h-fit lg:sticky top-0">
            <div className="hidden lg:block">
              <ProfileCard home />
            </div>
            <div className="mt-5 flex flex-start">
              <span className="mr-2">
                <TopicLink label={"Courses"} route={"/courses"} />
              </span>
              <span className="mr-2">
                <TopicLink label={"requests"} route={"/requests"} />
              </span>
            </div>
          </section>
          <section className="rounded-lg col-span-full  mx-auto lg:mx-0 order-last lg:order-none lg:col-span-4  relative  ">
            <div className="w-[90%]  overflow-hidden mx-auto sm:w-[65%] lg:w-[85%]">
              <PostContainer />
            </div>
          </section>
          <section className=" hidden lg:block  shadow-lg rounded-lg  grid-cols-5 lg:col-span-2 h-fit lg:sticky top-0">
            {Boolean(onlineFriends.length) && (
              <div className="bg-white mt-2 p-3">
                <h1 className=" text-xl pb-2 font-[400] border-b-4 border-b-mainBlue ">
                  My friends
                </h1>
                {Boolean(onlineFriends.length) &&
                  onlineFriends.map((u, index) => (
                    <OnlineFriends user={u} key={index} />
                  ))}
                {onlineFriends.length === 0 ? (
                  <h1 className="mx-auto mb-7 px-3 capitalize w-fit  font-bold text-xl border-b-4">
                    No friends online
                  </h1>
                ) : null}
              </div>
            )}
            <div className="bg-white shadow-md p-3 mt-2">
              <h1 className=" text-xl font-[400] pb-2 border-b-4 border-b-mainBlue ">
                My Playlists
              </h1>
              <EnrolledPlaylists />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
