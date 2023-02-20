const User = require("../model/useSchema");
const jwt = require("jsonwebtoken");
const { verifyPassword } = require("../utils/hashPassword");
const { isId } = require("../utils/protect");
const Post = require("../model/Post");

const Register = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
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
  } catch (error) {
    res.status(401).json({ msg: "some error" });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body.data;

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
  try {
    if (!AvatarURL) return res.status(400).send("not selected avatar image");
    if (!user) return res.status(400).send("can't find this user");
    const userExist = await User.findByIdAndUpdate(user._id, {
      firstVisit: false,
      AvatarUrl: AvatarURL,
    });
    userExist.password = undefined;
    res.status(200).json(JSON.stringify({ user: userExist, token }));
  } catch (error) {
    res.status(400).json({ msg: "some error in avatar" });
  }
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
  try {
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
  } catch (error) {
    res.status(500).json({ msg: "some error in server" });
  }
};
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!isId(id)) return res.status(404).json(JSON.stringify({ msg: "404" }));
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
  if (!isId(id)) return res.sendStatus(404);

  const following = await User.findByIdAndUpdate(
    req.userId,
    {
      $addToSet: {
        following: id,
      },
    },
    { new: true }
  ).select("-password -firstVisit");
  const followUser = await User.findByIdAndUpdate(
    id,
    {
      $addToSet: {
        followers: req.userId,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(JSON.stringify({ data: followUser }));
};
const getCardInfo = async (req, res) => {
  const { id } = req.params;
  if (!isId(id))
    return res.status(400).json({ msg: "not found id from params" });

  const user = await User.findById(id).select(
    " followers following fullName AvatarUrl"
  );

  res.status(200).json(JSON.stringify(user));
};
const postNewPost = async (req, res) => {
  const { title, userType, filed, skills } = req.body.data;
  try {
    const savedPost = await Post.create({
      title,
      userType,
      filed,
      skills,
      author: req.userId,
    });

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: {
          posts: savedPost._id,
        },
      },
      { new: true }
    );

    res.status(200).json(JSON.stringify(savedPost));
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};
const firstVisit = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: {
          firstVisit: false,
        },
      },
      {
        new: true,
      }
    );
    console.log(user);
    res.status(200).send({ msg: "done" });
  } catch (error) {
    res.status(400).json({ msg: "done" });
  }
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
  getCardInfo,
  postNewPost,
  firstVisit,
};
