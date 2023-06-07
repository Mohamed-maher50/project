import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { validationForm } from "../../validate/ValidateForm";
import InputForm from "../../components/inputForm";
import { displayMsg } from "../../validate/displayError";
import { useNavigate, Link } from "react-router-dom";
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
  displayMsg();
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
        displayMsg(res.payload);
      } else {
        const { user } = res.payload;
        displayMsg("👌 success", { type: "success", theme: "light" });
        if (user?.firstVisit === true) return nav("/avatar");
        nav(`/`);
      }
    } else {
      result.forEach((errMsg) => {
        displayMsg(errMsg);
      });
    }
  };
  return (
    <div className="h-screen items-center flex bg-mainBlue">
      <div className="flex mx-auto h-fit shadow-md   rounded-md overflow-hidden">
        <form
          className=" flex  flex-col pt-14  w-fit p-5  bg-main"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-2xl uppercase  border-mainBlue border-b-4 mb-8 w-fit mx-auto px-4 text-mainBlue">
            Login
          </h1>
          {inputs.map((inp) => {
            return (
              <InputForm
                labelBlock
                {...inp}
                key={inp.id}
                handler={handleChange}
              />
            );
          })}
          <Link to={"/register"} className="underline text-mainBlue font-bold">
            i don't have account
          </Link>
          <button className="main-btn px-4 rounded-md mt-4 py-2  mx-auto">
            Submit
          </button>
        </form>
        <img
          src="/logo1.png"
          className=" hidden md:flex"
          alt="logo"
          width={"450px"}
        />
      </div>
    </div>
  );
}

export default Login;
