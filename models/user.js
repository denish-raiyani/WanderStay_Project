// create "user" model and export it into "app.js" file.
const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// create SCHEMA
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// plugin Passport-Local-Mongoose into User schema to auto-create username, hashing + salting, and hash password
userSchema.plugin(passportLocalMongoose);

// create & Export MODEL
module.exports = mongoose.model("User", userSchema);
