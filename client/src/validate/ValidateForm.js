export const validationForm = (type, data) => {
  const errors = [];
  var flagError = true;

  if (type == "register") {
    if (
      data.confirmPassword.trim() == "" ||
      data.Password.trim() == "" ||
      data.FirstName.trim() == "" ||
      data.LastName.trim() == ""
    ) {
      errors.push("please enter filed");
      flagError = false;
      return errors;
    }
  }
  if (data.confirmPassword != data.Password) {
    errors.push("confirm password not equal password");
    flagError = false;
  }
  if (data.Email.trim() == "") {
    errors.push("email not valid");
    flagError = false;
  }
  return flagError ? true : errors;
};
