const router = require("express").Router();

const {
  Register,
  Login,
  Avatar,
  addSkill,
  getSkills,
  SearchUsers,
} = require("../controllers/userControllers");
const protect = require("../utils/protect");

router.post("/auth/register", Register);
router.post("/auth/login", Login);
router.put("/avatar", Avatar);
router.post("/addSkill", protect, addSkill);
router.get("/getSkills", protect, getSkills);
router.get("/search", protect, SearchUsers);
module.exports = router;
