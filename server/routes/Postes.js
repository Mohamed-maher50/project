const { getAllPosts } = require("../controllers/PostesControllers");
const { protect } = require("../utils/protect");
const router = require("express").Router();

router.get("/getPosts", protect, getAllPosts);
module.exports = router;
