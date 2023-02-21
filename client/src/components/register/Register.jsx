import React, { useRef, useState } from "react";
import InputForm from "../inputForm";
import { validationForm } from "../../validate/ValidateForm";
import { useDispatch } from "react-redux";
import { registerAuth } from "../../store/user";
import { displayError } from "../../validate/displayError";
import { Link, useNavigate } from "react-router-dom";
import { inputs } from "./inputs";

function Register() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validationForm("register", formData);
    if (result == true) {
      const res = await dispatch(registerAuth(formData));
      if (res.error) return displayError(res.payload);
      displayError(" success", { type: "success", theme: "light" });
      nav("/avatar");
    } else {
      result.forEach((errMsg) => {
        displayError(errMsg);
      });
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <div className="h-full flex justify-center items-center bg-secondary ">
        <form
          className="flex bg-open flex-col w-fit mx-auto p-8 pt-14 shadow-lg shadow-open border-4 border-white"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col  ">
            <div className="mr-2">
              <InputForm
                label={"First Name"}
                type="text"
                name={"firstName"}
                labelBlock
                handler={handleChange}
              />
            </div>
            <div>
              <InputForm
                label={"Last Name"}
                name={"lastName"}
                labelBlock
                handler={handleChange}
              />
            </div>
          </div>
          {inputs.map((inp) => {
            return (
              <InputForm
                {...inp}
                key={inp.id}
                handler={handleChange}
                labelBlock
              />
            );
          })}
          <Link to="/login" className=" text-darkWhite   font-bold underline">
            I have account
          </Link>
          <button className="main-btn bg-open">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;
