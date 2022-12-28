const router = require("express").Router();
const { Register, Login } = require("../controllers/userControllers");
router.post("/register", Register);
router.post("/login", Login);
module.exports = router;
