import React, { useEffect } from "react";
import { asyncToast } from "../validate/displayError";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getRequest, putRequest } from "../utils/ProfileMethods";

const VerifyEmail = () => {
  const { id, token } = useParams();
  const nav = useNavigate();
  useEffect(() => {
    const toast = asyncToast();
    const sendVersification = async () => {
      const [data, err] = await getRequest(`/${id}/verify/${token}`);
      if (!err) {
        toast();
        nav("/avatar");
      } else {
        toast("error");
        nav("/login", { replace: true });
      }
    };
    sendVersification();
  }, []);
  return (
    <div className="bg-mainBlue h-screen flex justify-center items-center ">
      <div className="  border-main border-2 items-center justify-center  flex p-5 shadow-lg w-44 h-44 rounded-full">
        <span className="text-main text-center text-xl capitalize">
          your email Verifying...
        </span>
      </div>
    </div>
  );
};

export default VerifyEmail;
