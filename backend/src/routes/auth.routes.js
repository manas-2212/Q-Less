const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controller");

const passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:3000/login"
  }),
  (req, res) => {
    const { token } = req.user;

    res.redirect(
      `http://localhost:3000/oauth-success?token=${token}`
    );
  }
);


router.post("/signup", signup);
router.post("/login", login);


module.exports = router;
