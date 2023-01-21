const router = require("express").Router();

const { Register, Login, Avatar } = require("../controllers/userControllers");
router.post("/register", Register);
router.post("/login", Login);
router.put("/avatar", Avatar);
module.exports = router;
