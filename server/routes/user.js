const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.originalUrl == "/avatar") return cb(null, "uploads/avatar");
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const {
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
  checkEmailExist,
} = require("../controllers/userControllers");
const { protect } = require("../utils/protect");
const { body, param } = require("express-validator");
const { verifyPassword } = require("../utils/hashPassword");

router.post(
  "/auth/register",
  body("email")
    .trim()
    .normalizeEmail()
    .not()
    .custom(checkEmailExist)
    .withMessage("this account already exist"),
  body("firstName").trim().not().isEmpty().withMessage("firstName is required"),
  body("lastName").trim().not().isEmpty().withMessage("lastName is required"),
  body("password")
    .not()
    .isEmpty()
    .trim()
    .custom((password, { req }) => {
      if (password != req.body.confirmPassword)
        return Promise.reject("password not equal confirm password");
      return true;
    }),
  Register
);
router.post(
  "/auth/login",
  body("email").isEmail().trim().normalizeEmail().custom(checkEmailExist),

  body("password")
    .isLength({ min: 2 })
    .withMessage("password must be at least 7 chars long")
    .custom(verifyPassword),
  Login
);
router.get("/profile/card/:id", protect, getCardInfo);
router.put("/avatar", protect, upload.single("avatar"), Avatar);
router.post("/addSkill", protect, addSkill);
router.get("/getSkills", protect, getSkills);
router.get("/search", protect, SearchUsers);
router.get("/profile/:id", getUser);
router.put("/profile/follow", protect, SendFollow);
router.post("/createPost", protect, postNewPost);
router.put("/firstVisit", protect, firstVisit);
module.exports = router;
