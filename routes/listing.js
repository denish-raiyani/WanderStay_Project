/* --- Listing's Routes --- */

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // Utility Middleware
const { validateListing, isLoggedIn, isOwner } = require("../middleware.js"); // validateListing(), isAuthenticated(), isOwner() middleware

// controller require
const listingController = require("../controllers/listings.js");

// Multer + Cloudinary package
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); // upload file on cloud server

/* --- re-format using express "router.route()" --- */
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  ); // Create Route (CREATE)

router.get("/new", isLoggedIn, listingController.renderNewForm); // New Route (CREATE)

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show Route (READ)
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  ) // Update Route (UPDATE)
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // Delete Route (DELETE)

router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm)); // Edit Route (UPDATE)

module.exports = router;
