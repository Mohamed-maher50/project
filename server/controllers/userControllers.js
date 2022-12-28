const User = require("../model/useSchema");

const jwt = require("jsonwebtoken");
const { verifyPassword } = require("../utils/hashPassword");
const Register = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  if (!firstName || !lastName || !email || !password || !confirmPassword)
    return res.status(400).send({ msg: "please fill fields" });
  if (password.trim() != confirmPassword.trim())
    return res.send({ msg: "password and confirm password not equal" });
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.send({ msg: "this email already exist" });
    let user = await new User({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }).save();
    const token = await jwt.sign(user.id, "mohamedasdafkj");
    res.cookie("jwt", token, { maxAge: 1000 * 60 * 60 * 24 });
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(401).send({ msg: "please fill fields" });
  try {
    const userExist = await User.findOne({ email });
    const token = await jwt.sign(userExist.id, process.env.SECRET_KEY_JWT);
    if (await verifyPassword(password, userExist.password)) {
      return res.status(200).json(
        JSON.stringify({
          _id: userExist._id,
          token,
        })
      );
    }
    res.status(401).send({ msg: "password not correct !" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  Register,
  Login,
};
