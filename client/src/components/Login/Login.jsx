import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationForm } from "../../validate/ValidateForm";
import InputForm from "../inputForm";
const inputs = [
  {
    id: "1",
    name: "Email",
    label: "Email",
    type: "email",
  },
  {
    id: "2",
    name: "Password",
    label: "Password",
    type: "password",
  },
];
function Login() {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let result = validationForm("login", formData);

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

export default Login;
