/* --- Review's Routes --- */

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js"); // Utility Middleware
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js"); // validateReview() middleware

// controller require
const reviewController = require("../controllers/reviews.js");

// Post Reviews Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Reviews Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
