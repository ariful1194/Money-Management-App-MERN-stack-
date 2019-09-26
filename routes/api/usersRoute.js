const router = require("express").Router();
const {
  login,
  register,
  allUser,
  singleUser,
  reset,
  resetLink,
  getResetLink,
  check,
  resetEmail,
  s,
  resetPassword
} = require("../../controllers/UserController");
router.get("/test", (req, res) => {
  res.json({ msg: "hello" });
});

router.post("/register", register);
router.post("/login", login);
router.get("/all", allUser);
router.get("/:id", singleUser);
router.post("/resetlink", resetLink);
router.get("/passwordreset/:random", getResetLink);
router.post("/passwordreset/", reset);
router.get("/check/:random", check);
router.post("/resetemail", resetEmail);
router.post("/resetpassword", resetPassword);

module.exports = router;
