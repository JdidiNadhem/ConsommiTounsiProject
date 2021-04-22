const mongoose = require("mongoose");
const { Schema } = mongoose;
const Product = require("./Product").schema;
const purchaseSchema = new Schema({
  client: { required: true, type: Schema.Types.ObjectId, ref: "client" },
  products: [Product],

  shippingAdress: {
    type: String,
    require: true,
  },
  total: Number,
  purchaseDate: { required: true, type: Date },
  shippingDate: { required: true, type: Date },
});

module.exports = Purchase = mongoose.model("purchase", purchaseSchema);
