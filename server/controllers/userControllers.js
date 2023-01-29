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
  user = await User.findById(user.id).select("-password");
  const token = await jwt.sign(user.id, process.env.SECRET_KEY_JWT);
  res.status(201).json(JSON.stringify({ user, token: token }));
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
//
const addSkill = async (req, res) => {
  const { data } = req.body;
  if (!data)
    return res.status(400).json(JSON.stringify({ msg: "Enter Value" }));
  const skills = await User.findByIdAndUpdate(
    req.userId,
    {
      $push: {
        skills: data,
      },
    },
    { new: true }
  ).select("skills -_id");

  res.status(200).json(JSON.stringify(skills));
};
const getSkills = async (req, res) => {
  const skills = await User.findById(req.userId).select("skills -_id");
  res.status(200).json(JSON.stringify(skills));
};
const SearchUsers = async (req, res) => {
  const query = req.query.searchValue;
  if (!query) return res.status(200).json(JSON.stringify([]));
  const users = await User.find({
    fullName: {
      $regex: query,
      $options: "i",
    },
  })
    .select("-password -firstName -lastName -firstVisit")
    .limit(5);
  res.status(200).json(JSON.stringify(users));
};
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(404).json(JSON.stringify({ msg: "404" }));
  try {
    const user = await User.findById(id).select(
      "-password -firstName -lastName -firstVisit"
    );
    res.status(200).json(JSON.stringify(user));
  } catch (error) {
    res.sendStatus(400);
  }
};
const SendFollow = async (req, res) => {
  const { id } = req.body;
  if (!id) return res.sendStatus(404);

  const following = await User.findByIdAndUpdate(
    req.userId,
    {
      $addToSet: {
        following: id,
      },
    },
    { new: true }
  ).select("-password -firstVisit");
  const addToFollowers = await User.findByIdAndUpdate(id, {
    $addToSet: {
      followers: req.userId,
    },
  });

  res.status(200).json(JSON.stringify({ user: following, token: req.token }));
};
module.exports = {
  Register,
  Login,
  Avatar,
  addSkill,
  getSkills,
  SearchUsers,
  getUser,
  SendFollow,
};
