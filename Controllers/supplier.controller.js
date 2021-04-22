const Product = require("../Models/Product");
const Supplier = require("../Models/Supplier");

exports.add_product = async (req, res) => {
  try {
    // req.body name,categorie,description,rating,price,barcode
    const {
      name,
      categorie,
      description,
      rating,
      price,
      barcode,
      image,
    } = req.body;

    // req.client
    const client = req.client;

    // Find supplier from author

    const supplier = await Supplier.findOne({ client: client._id }).select(
      "-client"
    );
    if (!supplier) {
      return res.status(400).send({ msg: "Supplier not found" });
    }

    // Adding product

    const newProduct = new Product({
      supplier: supplier._id,
      name,
      categorie,
      description,
      rating,
      price,
      barcode,
      image,
    });
    await newProduct.save();
    res.status(200).send({ msg: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not add Product", error }] });
  }
};

exports.delete_product = async (req, res) => {
  try {
    // req.params id
    const { id } = req.params;
    // req.client
    const client = req.client;

    // Find supplier from author

    const supplier = await Supplier.findOne({ client: client._id }).select(
      "-client"
    );
    if (!supplier) {
      return res.status(400).send({ msg: "Supplier not found" });
    }

    // DELETE product
    await Product.deleteOne({ _id: id, supplier: supplier._id });

    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "can not delete Product", error }] });
  }
};

exports.update_product = async (req, res) => {
  try {
    // req.params
    const { id } = req.params;

    // req.body modification
    const modification = req.body;

    // req.client
    const client = req.client;

    // Find supplier from author

    const supplier = await Supplier.findOne({ client: client._id }).select(
      "-client"
    );
    if (!supplier) {
      return res.status(400).send({ msg: "Supplier not found" });
    }
    // Updating product
    await Product.updateOne(
      { _id: id, supplier: supplier._id },
      { $set: { ...modification } }
    );
    res.status(200).send({ msg: "Product updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "can not update Product", error }] });
  }
};

exports.get_products_for_sold = async (req, res) => {
  try {
    const client = req.client;

    // Find supplier from author

    const supplier = await Supplier.findOne({ client: client._id }).select(
      "-client"
    );
    if (!supplier) {
      return res.status(400).send({ msg: "Supplier not found" });
    }

    const products = await Product.find({ supplier: supplier._id }).populate(
      "Supplier"
    );

    res.status(200).send({
      msg: "Here is all the products for Sold",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errors: [{ msg: "Can not Get products" }],
    });
  }
};

exports.sold_authorisation = async (req, res) => {
  try {
    // get the client
    const author = req.client;
    // get req.body (society,societyname and type)
    const supplierData = req.body;
    // Update the supplier (set the )
    const result = await Supplier.updateOne(
      { client: author.id },
      { $set: { ...supplierData } }
    );
    res.status(200).send({
      msg: "Supplier added successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errors: [{ msg: "Can not Get products" }],
    });
  }
};

exports.get_supplier = async (req, res) => {
  try {
    // GET auuthor
    const author = req.client;
    // GET SUPPLIER FROM AUTHOR

    const clientSupplier = await Supplier.findOne({
      client: author._id,
    }).populate("Client");

    if (!clientSupplier) {
      res.status(400).send({
        errors: [{ msg: "Supplier not found" }],
      });
    }

    res.status(200).send({
      msg: "Here is the Supplier",
      clientSupplier,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      errors: [{ msg: "Can not Get products" }],
    });
  }
};
