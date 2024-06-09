// create a "review" model and export it into "listing.js" file.
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create SCHEMA
const reviewSchema = new Schema({
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// create MODEL
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
