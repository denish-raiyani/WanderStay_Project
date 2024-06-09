// logic of data initialization

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

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

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

async function main() {
  await mongoose.connect(DB_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "666408196d72efdd39bda36a" }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
