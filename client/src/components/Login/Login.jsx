import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationForm } from "../../validate/ValidateForm";
import InputForm from "../inputForm";
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

    if (result == true) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/auth/login",
          formData
        );
        localStorage.setItem("userInfo", data);
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
      } catch (error) {
        if (error.response.status == 401) {
          toast(error.response.data, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            type: "error",
          });
        }
      }
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
    <div className="h-full flex justify-center items-center bg-[#20023e]">
      <form
        className=" flex flex-col w-fit mx-auto p-10 pt-14 border-white border-4"
        onSubmit={handleSubmit}
      >
        {inputs.map((inp) => {
          return <InputForm {...inp} key={inp.id} handler={handleChange} />;
        })}
        <button className="main-btn">Submit</button>
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
    </div>
  );
}

export default Login;
