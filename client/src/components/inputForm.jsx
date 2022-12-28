import React from "react";

function InputForm({ type, value, label, name, id }) {
  return (
    <>
      <label
        className="capitalize font-[Josefin] font-bold border-main"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={label}
        className=" w-80 pl-2  border-2 h-9 my-2"
      />
    </>
  );
}

export default InputForm;
