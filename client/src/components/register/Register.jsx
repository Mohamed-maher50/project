import React from "react";
import InputForm from "../inputForm";
const inputs = [
  {
    id: "1",
    name: "FirstName",
    label: "First Name",
    type: "text",
  },
  {
    id: "2",
    name: "lastName",
    label: "last Name",
    type: "text",
  },
  {
    id: "3",
    name: "Email",
    label: "Email",
    type: "email",
  },
  {
    id: "4",
    name: "Password",
    label: "Password",
    type: "password",
  },
  {
    id: "5",
    name: "confirmPassword",
    label: "confirm Password",
    type: "password",
  },
];
const handleSubmit = (e) => {
  e.preventDefault();
};
function Register() {
  return (
    <form
      className="border flex flex-col w-fit mx-auto p-10 pt-14 border-main"
      onSubmit={handleSubmit}
    >
      {inputs.map((inp) => {
        return <InputForm {...inp} key={inp.id} />;
      })}
      <button className="text-main font-[Josefin] border border-main py-2 transition duration-500 ease-in-out hover:bg-main hover:text-white font-bold text-xl">
        Submit
      </button>
    </form>
  );
}

export default Register;
