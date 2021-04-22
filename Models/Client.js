const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require("./Product").schema;

const clientSchema = new Schema({
  cin: {
    require: true,
    type: Number,
  },
  fullname: {
    require: true,
    type: String,
  },
  phone: {
    require: true,
    type: String,
  },
  adress: {
    require: true,
    type: String,
  },
  email: {
    require: true,
    type: String,
    unique: true,
  },
  password: {
    require: true,
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [Product],
});

module.exports = Client = mongoose.model("client", clientSchema);
