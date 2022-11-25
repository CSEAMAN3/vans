const mongoose = require("mongoose");
const { Schema } = mongoose;
const vansSchema = new Schema({
  make: String,
  model: String,
  engine: String,
  lwb: Boolean,
});

const Vans = mongoose.model("Vans", vansSchema);
module.exports = Vans;
