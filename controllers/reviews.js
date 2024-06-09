const Review = require("../models/review.js"); // model: review
const Listing = require("../models/listing.js"); // model: listing (b'coz, reviews are add in listing)

// Post Reviews Route
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  // console.log(req.params.id);
  // console.log(req);
  let newReview = new Review(req.body.review);

  // store review-author after newReview created
  newReview.author = req.user._id;

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

// Delete Reviews Route
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
