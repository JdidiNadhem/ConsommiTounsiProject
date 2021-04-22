const Product = require("../Models/Product");
const Purchase = require("../Models/Purchase");

exports.Get_all_products = async (req, res) => {
  try {
    const result = await Product.find().populate("supplier");
    if (!result) {
      res.status(400).send({ msg: "Can not get all the products" });
    }
    // console.log(result);
    res.status(200).send({ msg: "here is all the products", products: result });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Can not get all the products", error });
  }
};

exports.Get_product_by_id = async (req, res) => {
  try {
    // Get id from params
    const { id } = req.params;

    const result = await Product.findById(id).populate("supplier");
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Can not get the product" }] });
    }
    res.status(200).send({ msg: "here  the product", product: result });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "Can not get  the product", error }] });
  }
};
