import React from "react";

function InputForm({ type, value, label, name, id, handler }) {
  return (
    <>
      <label
        className="capitalize text-white font-Josefin font-bold border-main"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        onChange={(e) => handler(e)}
        type={type}
        name={name}
        placeholder={label}
        className=" w-80 pl-2  border-2 h-9 my-2"
      />
    </>
  );
}

export default InputForm;
