const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
  client: { require: true, type: Schema.Types.ObjectId, ref: "client" },
  name: { type: String, require: true },
  rating: { type: Number, require: true },
  comment: { type: String, require: true },
});

module.exports = Review = mongoose.model("review", reviewSchema);
