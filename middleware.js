const Listing = require("./models/listing.js"); // model: listing
const Review = require("./models/review.js"); // model: review
const ExpressError = require("./utils/ExpressError.js"); // Utility Middleware
const { listingSchema, reviewSchema } = require("./schema.js"); // Joi (server side)

/* -- Validations for "listingSchema" (Middleware) || joi --*/
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

/* -- Validations for "reviewSchema" (Middleware) || joi -- */
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

/* -- "req.isAuthenticated()" => Passport method (middleware checks if the user is logged in or not?) --*/
module.exports.isLoggedIn = (req, res, next) => {
  // console.log(req.user);
  // console.log(req.path, "..", req.originalUrl);

  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // redirectUrl save after login
    req.flash("error", "you must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

/* -- save "redirectUrl" in "res.locals". b'coz, passport is reset to "req.session" and delete "redirectUrl". --*/
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

/* -- -	Authorization: Check if the current-user is the "owner" of the "listing" or not. -- */
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

/* -- -	Authorization: Check if the current-user is the "author" of the "review" or not. -- */
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
