export const validationForm = (type, data) => {
  const errors = [];
  var flagError = true;

  if (type === "register") {
    if (data.confirmPassword !== data.password) {
      errors.push("confirm password not equal password");
      flagError = false;
    }
    if (
      data.confirmPassword.trim() === "" ||
      data.password.trim() === "" ||
      data.firstName.trim() === "" ||
      data.lastName.trim() === ""
    ) {
      errors.push("please enter filed");
      flagError = false;
      return errors;
    }
  }

  if (data.email.trim() === "") {
    errors.push("email not valid");
    flagError = false;
  }
  if (data.password === "") {
    errors.push("please enter password");
    flagError = false;
  }
  return flagError ? true : errors;
};
