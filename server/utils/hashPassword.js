const bcryptjs = require("bcryptjs");

const hastPassword = async (password) => {
  const salt = await bcryptjs.genSalt();
  const hastedPassword = await bcryptjs.hash(password, salt);
  return hastedPassword;
};
const verifyPassword = async (password, hashPassword) => {
  return await bcryptjs.compare(password, hashPassword);
};
module.exports = {
  hastPassword,
  verifyPassword,
};
