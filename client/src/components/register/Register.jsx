import React, { useState } from "react";
import InputForm from "../inputForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validationForm } from "../../validate/ValidateForm";
import axios from "axios";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = validationForm("register", formData);
    if (result == true) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/auth/register",
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
