// dotenv package
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js"); // Utility Middleware
const session = require("express-session"); // Session Middleware
const MongoStore = require("connect-mongo"); // Mongo Session Store
const flash = require("connect-flash"); // flash Middleware
const passport = require("passport"); // passport Authentication Middleware
const LocalStrategy = require("passport-local"); // Passport strategy for authenticating
const User = require("./models/user.js"); // model: user (use passport)

// routes import
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// connect mongoose
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderstay";

// connect mongoDB Atlas
const DB_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", ejsMate);

/* --- Middleware - Plugin --- */
app.use(express.urlencoded({ extended: true })); // parshing
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// create Mongo-Session-Store before "sessionOptions" | Session information store in Atlas Database using "connect-mongo".
const store = MongoStore.create({
  mongoUrl: DB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, // Interval (in seconds) between session updates.
});

// if get error in mongo-store then showing error in console
store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

// create session-option for session() middleware
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// use "res.locals" property to show a flash message
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

/* --- Home Route --- */
// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

/* --- LISTING_ROUTE (./routes/listing.js) --- */
app.use("/listings", listingRouter);

/* --- REVIEWS_ROUTE (./routes/review.js) --- */
app.use("/listings/:id/reviews", reviewRouter);

/* --- USERS_ROUTE (./routes/user.js) --- */
app.use("/", userRouter);

/* --- Error_Handling --- */
// show express-error on the page when a route is not available
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Oops! This Page Could Not Be Found!"));
});

// Define "error" Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log(`server is listning to port 8080`);
});
