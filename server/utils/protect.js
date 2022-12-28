const jwt = require("jsonwebtoken");
const User = require("../model/useSchema");
const Auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log(token);
    return res.sendStatus(401);
  }
  const verify = await jwt.verify(token, "mohamedasdafkj");
  if (!verify) res.send({ errorMsg: "not found this account" });
  req.userId = verify;
  next();
};

module.exports = Auth;
