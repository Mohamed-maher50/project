const router = require("express").Router();

const {
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
  deleteSkill,
  getFriends,
  UpRate,
} = require("../controllers/userControllers");
const { protect } = require("../utils/protect");
const { body } = require("express-validator");
const { verifyPassword } = require("../utils/hashPassword");
const { Register, Login, verifyEmail } = require("../controllers/auth");

router.post(
  "/auth/register",
  body("NationalID")
    .trim()
    .not()
    .isEmpty()
    .withMessage("NationalID is required"),
  body("email")
    .trim()
    .normalizeEmail()
    .not()
    .custom(checkEmailExist)
    .not()
    .withMessage("this account already exist"),
  body("fullName").trim().not().isEmpty().withMessage("fullName is required"),
  body("birthDay")
    .trim()
    .not()
    .isEmpty()
    .isDate()
    .withMessage("date is required"),
  body("city").trim().not().isEmpty(),
  body("password")
    .isLength({ min: 7 })
    .withMessage(" password should be at least 7 characters. ")
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
  body("password").custom(verifyPassword).withMessage("password wrong"),
  Login
);
router.get("/profile/card/:id", protect, getCardInfo);
router.get("/search", protect, SearchUsers);
router.get("/getSkills", protect, getSkills);
router.get("/profile/:id", getUser);
router.get("/getFriends", protect, getFriends);
router.post("/addSkill", protect, addSkill);
router.post("/createPost", protect, postNewPost);
router.post("/done", UpRate);
router.put("/avatar", protect, Avatar);
router.put("/profile/follow", protect, SendFollow);
router.put("/firstVisit", protect, firstVisit);
router.delete("/deleteSkill/:id", protect, deleteSkill);
router.get("/:id/verify/:token", verifyEmail);
module.exports = router;
