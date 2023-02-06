import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchBox({ handleSearchBox }) {
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;
  const [searchResults, setSearchResults] = useState([]);
  const config = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  const handleSearchValue = async (e) => {
    const { data } = await axios.get(
      `http://localhost:4000/search?searchValue=${e.target.value.trim()}`,
      config
    );
    setSearchResults(JSON.parse(data));
  };
  return (
    <>
      <div className="absolute w-fit right-0 top-0 py-4 z-50 px-2 rounded-md shadow bg-secondary text-gray-400 ">
        <div className="flex items-center">
          <input
            type={"search"}
            className="px-3 w-60 h-10 rounded-full bg-gray-200 outline-none text-black"
            placeholder="Search in You Can"
            spellCheck={false}
            onChange={handleSearchValue}
          />
          <i
            className="fas fa-arrow-right text-2xl icon-btn text-white rounded-full ml-1  font-bold"
            onClick={handleSearchBox}
          ></i>
        </div>
        <div className="text-center text-white font-bold text-xl">Result</div>
        <div>
          {searchResults.map((box) => {
            return (
              <Link
                onClick={handleSearchBox}
                to={`/profile/${box._id}`}
                key={box._id}
                className="text-white shadow-lg px-3 py-2 bg-main rounded-lg flex items-center text-xl capitalize mb-3 hover:bg-white duration-500 ease-in-out hover:text-main"
              >
                <div>{box.fullName}</div>
                <img
                  src={box.AvatarUrl}
                  alt={box.fullName}
                  className="w-11 h-11 ml-auto rounded-full overflow-hidden"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default SearchBox;
