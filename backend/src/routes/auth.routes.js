const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth.controller");
const passport = require("passport");

const FRONTEND_URL = process.env.FRONTEND_URL;

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
    failureRedirect:`${FRONTEND_URL}/login`
  }),
  (req, res) => {
    const {token} = req.user;

    res.redirect(
      `${FRONTEND_URL}/oauth-success?token=${token}`
    );
  }
);

router.post("/signup", signup)
router.post("/login", login)

module.exports = router;
