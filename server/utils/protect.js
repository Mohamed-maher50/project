const jwt = require("jsonwebtoken");
const User = require("../model/useSchema");
const protect = async (req, res, next) => {
  console.log(req.body);
  var token = req.headers.authorization?.split(" ")[1];
  req.token = token;
  console.log(token);
  try {
    const result = await jwt.verify(
      token,
      process.env.SECRET_KEY_JWT,
      (err, result) => {
        if (err?.name == "JsonWebTokenError")
          return res.status(401).send("please try login");

        return result;
      }
    );
    if (!result) return res.status(401).send("unauthorized");

    req.userId = result;

    next();
  } catch (error) {
    console.log(error);
    res.send("done");
  }
};

module.exports = protect;
