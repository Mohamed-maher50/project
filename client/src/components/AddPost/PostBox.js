import React from "react";

function PostBox() {
  return (
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
          <option>activeties</option>
        </select>
      </div>
    </div>
  );
}

export default PostBox;
