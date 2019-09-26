const router = require("express").Router();
const passport = require("passport");
const {
  create,
  getAll,
  getSingleTransation,
  update,
  remove
} = require("../../controllers/transcationController");

router.get("/test", (req, res) => {
  res.json({ msg: "hello" });
});

//@route  Get api/transaction/
//@desc   see all transaction
//@access Private
router.get("/", passport.authenticate("jwt", { session: false }), getAll);
//@route  post api/transaction/
//@desc   Add a transaction
//@access Private
router.post("/", passport.authenticate("jwt", { session: false }), create);
//@route  Get api/transaction/id
//@desc   see a transaction
//@access Private
router.get(
  "/:transactionId",
  passport.authenticate("jwt", { session: false }),
  getSingleTransation
);
//@route  Get api/transaction/id
//@desc   view a  transaction
//@access Private
router.get("/:transactionId", (req, res) => {});

//@route  Put api/transaction/:id
//@desc   eidt a transaction
//@access Private
router.put(
  "/:transactionId",
  passport.authenticate("jwt", { session: false }),
  update
);

//@route  Delete api/transaction/id
//@desc   see all transaction
//@access Private
router.delete(
  "/:transactionId",
  passport.authenticate("jwt", { session: false }),
  remove
);
module.exports = router;
