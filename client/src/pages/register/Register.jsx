import React, { useRef, useState } from "react";

import { validationForm } from "../../validate/ValidateForm";
import { useDispatch } from "react-redux";
import { registerAuth } from "../../store/user";
import { displayMsg } from "../../validate/displayError";
import { Link, useNavigate } from "react-router-dom";
import { inputs } from "./inputs";

import Select from "react-select";
import InputForm from "../../components/inputForm";
import citys from "../../components/citys";
function Register() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    birthDay: "",
    email: "",
    password: "",
    city: "Cairo",
    confirmPassword: "",
    NationalID: "",
  });
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validationForm("register", formData);
    if (result == true) {
      const res = await dispatch(registerAuth(formData));
      if (res.error) return displayMsg(res.payload);
      displayMsg(" success", { type: "success", theme: "light" });
      nav("/verifyInformation");
    } else {
      result.forEach((errMsg) => {
        displayMsg(errMsg);
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
      <div className="h-full overflow-y-auto flex bg-mainBlue justify-center items-center">
        <form
          className="flex flex-col w-fit mx-auto p-4 md:p-8 pt-5 md:pt-14 shadow-lg  border-4 bg-white"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center lg:text-2xl uppercase borders border-mainBlue border-b-4 mb-4 md:mb-8 w-fit mx-auto px-4  text-mainBlue">
            Sign up
          </h1>
          <div className="md:grid gap-2 grid-cols-2 ">
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
            <div className="h-full">
              <label
                className={`capitalize text-white font-Josefin font-bold border-main block`}
              >
                city
              </label>

              <Select
                options={citys}
                name="city"
                required={true}
                isSearchable
                defaultValue={""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.value }))
                }
                placeholder="Select city"
              />
            </div>
          </div>

          <Link
            to="/login"
            className="my-3 text-mainBlue   font-bold underline"
          >
            I have account
          </Link>
          <button className="main-btn py-2 px-4 rounded-md">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;
