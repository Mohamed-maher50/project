const router = require("express").Router();

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
} = require("../controllers/userControllers");
const { protect } = require("../utils/protect");

router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.get("/profile/card/:id", protect, getCardInfo);
router.put("/avatar", protect, Avatar);
router.post("/addSkill", protect, addSkill);
router.get("/getSkills", protect, getSkills);
router.get("/search", protect, SearchUsers);
router.get("/profile/:id", getUser);
router.put("/profile/follow", protect, SendFollow);
router.post("/createPost", protect, postNewPost);
router.put("/firstVisit", protect, firstVisit);
module.exports = router;
