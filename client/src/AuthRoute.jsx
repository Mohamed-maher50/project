import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user.userData);
  const nav = useNavigate();

  if (!user) nav("/login");
  return <div>{children}</div>;
};

export default AuthRoute;
