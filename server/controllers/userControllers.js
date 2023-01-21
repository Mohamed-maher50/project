const User = require("../model/useSchema");

const jwt = require("jsonwebtoken");
const { verifyPassword } = require("../utils/hashPassword");

const Register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  if (!firstName || !lastName || !email || !password || !confirmPassword)
    return res.status(400).send({ msg: "please fill fields" });

  if (password.trim() != confirmPassword.trim())
    return res.send({ msg: "password and confirm password not equal" });

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(401);
    return res.send("this account already exist");
  }
  let user = await new User({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  }).save();
  user = await User.findById(user.id).select("email");
  const token = await jwt.sign(user.id, process.env.SECRET_KEY_JWT);
  res.status(201).json(JSON.stringify({ email: user.email, jwt: token }));
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(401).send("please fill fields");
  try {
    var userExist = await User.findOne({ email });
    if (!userExist) return res.status(401).send("email not correct");
    const token = await jwt.sign(userExist.id, process.env.SECRET_KEY_JWT);
    if (await verifyPassword(password, userExist.password)) {
      userExist.password = undefined;
      return res.status(200).json(JSON.stringify({ user: userExist, token }));
    }

    res.status(401).send("password not correct !");
  } catch (error) {
    console.log(error);
  }
};
const Avatar = async (req, res) => {
  const { AvatarURL, user, token } = req.body;

  if (!AvatarURL) return res.status(400).send("not selected avatar image");
  if (!user) return res.status(400).send("can't find this user");
  const userExist = await User.findByIdAndUpdate(user._id, {
    firstVisit: false,
    AvatarUrl: AvatarURL,
  });
  userExist.password = undefined;
  res.status(200).json(JSON.stringify({ user: userExist, token }));
};
module.exports = {
  Register,
  Login,
  Avatar,
};
