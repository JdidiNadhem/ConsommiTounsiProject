const mongoose = require("mongoose");
const { Schema } = mongoose;
const Review = require("./Review").schema;
const productSchema = new Schema({
  supplier: { require: true, type: Schema.Types.ObjectId, ref: "supplier" },
  name: {
    type: String,
    require: true,
  },
  categorie: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  numReview: {
    type: Number,
    require: true,
    default: 0,
  },
  reviews: [Review],
  price: {
    type: Number,
    require: true,
  },
  barcode: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    require: true,
  },
});

module.exports = Product = mongoose.model("product", productSchema);
