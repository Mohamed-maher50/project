const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.originalUrl);
    if (req.originalUrl == "/avatar") return cb(null, "uploads/avatar");
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // console.log(req);
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
} = require("../controllers/userControllers");
const { protect } = require("../utils/protect");

router.post("/auth/register", Register);
router.post("/auth/login", Login);
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
