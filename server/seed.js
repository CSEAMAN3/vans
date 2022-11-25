const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);
const Vans = require("./models/vans");

async function seed() {
  await Vans.create({
    make: "Ford",
    model: "Transit connect",
    engine: "2l",
    lwb: true,
  });
  await Vans.create({
    make: "Volkswagon",
    model: "Caddy",
    engine: "2.2l",
    lwb: false,
  });
  console.log("All hail the vans");
}

seed();
