const User = require("../models/user.js"); // model: user

/* --- User SignUp --- */
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// used try-catch method for show/flash "error-message" in same page (/signup)
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body; // get data from req-body
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    // Login automatically after SignUp
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to Wanderstay!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

/* --- User Login --- */
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back to Wanderstay!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

/* --- User LogOut --- */
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
