import React, { useState } from "react";
import InputForm from "../inputForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationForm } from "../../validate/ValidateForm";
const inputs = [
  {
    id: "1",
    name: "FirstName",
    label: "First Name",
    type: "text",
  },
  {
    id: "2",
    name: "LastName",
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

function Register() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validationForm("register", formData);

    if (result == true) {
      toast("👌 success", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        type: "success",
      });
    } else {
      result.forEach((errMsg) => {
        toast(errMsg, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          type: "error",
        });
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
      <form
        className="border flex flex-col w-fit mx-auto p-10 pt-14 border-main"
        onSubmit={handleSubmit}
      >
        {inputs.map((inp) => {
          return <InputForm {...inp} key={inp.id} handler={handleChange} />;
        })}
        <button className="text-main font-[Josefin] border border-main py-2 transition duration-500 ease-in-out hover:bg-main hover:text-white font-bold text-xl">
          Submit
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      ></ToastContainer>
    </>
  );
}

export default Register;
