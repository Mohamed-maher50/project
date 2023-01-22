import React, { useState } from "react";
import InputForm from "../inputForm";
import { validationForm } from "../../validate/ValidateForm";
import { useDispatch } from "react-redux";
import { registerAuth } from "../../store/user";
import { displayError } from "../../validate/displayError";
const inputs = [
  {
    id: "1",
    name: "firstName",
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
    name: "email",
    label: "email",
    type: "email",
  },
  {
    id: "4",
    name: "password",
    label: "password",
    type: "password",
  },
  {
    id: "5",
    name: "confirmPassword",
    label: "confirm password",
    type: "password",
  },
];

function Register() {
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
      if (res.error) {
        displayError(res.payload);
      } else {
        displayError(" success", { type: "success", theme: "light" });
      }
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
    <div className="h-full flex justify-center items-center bg-main ">
      <form
        className=" flex flex-col w-fit mx-auto p-10 pt-14 border-4 border-white"
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

export default Register;
