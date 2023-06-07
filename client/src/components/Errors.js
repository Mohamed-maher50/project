import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { displayMsg } from "../validate/displayError";
function Errors(msg) {
  const { errors } = useSelector((state) => state.errors);
  useEffect(() => {
    errors?.forEach(({ response }) => {
      response?.data?.errors?.forEach((err) => {
        displayMsg(err.msg);
      });
    });
    displayMsg(msg);
  }, [errors]);

  return <></>;
}

export default Errors;
