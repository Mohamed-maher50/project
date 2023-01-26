const router = require("express").Router();

const {
  Register,
  Login,
  Avatar,
  addSkill,
  getSkills,
  SearchUsers,
  getUser,
} = require("../controllers/userControllers");
const protect = require("../utils/protect");

router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.put("/avatar", protect, Avatar);
router.post("/addSkill", protect, addSkill);
router.get("/getSkills", protect, getSkills);
router.get("/search", protect, SearchUsers);
router.get("/profile/:id", getUser);
module.exports = router;
