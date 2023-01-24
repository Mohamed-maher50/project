import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { validationForm } from "../../validate/ValidateForm";
import InputForm from "../inputForm";
import { loginAuth } from "../../store/user";
import { displayError } from "../../validate/displayError";
const inputs = [
  {
    id: "1",
    name: "email",
    label: "email",
    type: "email",
  },
  {
    id: "2",
    name: "password",
    label: "password",
    type: "password",
  },
];
function Login() {
  const dispatch = useDispatch();
  displayError();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validationForm("login", formData);
    if (result === true) {
      const res = await dispatch(loginAuth(formData));
      console.log(res);
      if (res.error) {
        displayError(res.payload);
      } else {
        displayError("👌 success", { type: "success", theme: "light" });
      }
    } else {
      result.forEach((errMsg) => {
        displayError(errMsg);
      });
    }
  };
  return (
    <div className="h-full flex justify-center items-center bg-main">
      <form
        className=" flex flex-col w-fit mx-auto p-10 pt-14 border-white border-4"
        onSubmit={handleSubmit}
      >
        {inputs.map((inp) => {
          return <InputForm {...inp} key={inp.id} handler={handleChange} />;
        })}
        <button className="main-btn">Submit</button>
      </form>
    </div>
  );
}

export default Login;
