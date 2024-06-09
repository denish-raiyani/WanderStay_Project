/* --- User's Routes --- */

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// controller require
const userController = require("../controllers/users.js");

/* --- User SignUp --- */
router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.signup));

/* --- User Login --- */
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    userController.login
  );

/* --- User LogOut --- */
router.get("/logout", userController.logout);

module.exports = router;
