import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { validationForm } from "../../validate/ValidateForm";
import InputForm from "../inputForm";
import updateToken from "../../config";
import { displayError } from "../../validate/displayError";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../../store/user";
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
  const nav = useNavigate();
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
      if (res.error) {
        displayError(res.payload);
      } else {
        const { user } = JSON.parse(res.payload);
        displayError("👌 success", { type: "success", theme: "light" });
        if (user?.firstVisit === true) return nav("/avatar");
        nav(`/home/${user._id}`);
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
