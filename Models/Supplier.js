const mongoose = require("mongoose");
const { Schema } = mongoose;

const SupplierSchema = new Schema({
  client: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "client",
  },
  society: {
    type: Boolean,
    required: true,
  },
  societyname: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
});

module.exports = Supplier = mongoose.model("supplier", SupplierSchema);
