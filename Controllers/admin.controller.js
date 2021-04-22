const Client = require("../Models/Client");
const Product = require("../Models/Product");
const Purchase = require("../Models/Purchase");
const Supplier = require("../Models/Supplier");

/*  CLIENTS */

// GET All the  clients
exports.get_clients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).send({ msg: "Here is All the clients", clients });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can not get Clients", error }] });
  }
};
// DELETE client by id

exports.delete_client = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    //   find client
    const findclient = await Client.findOne({ _id: id });
    if (!findclient) {
      return res.status(400).send({ errors: [{ msg: "Client not found" }] });
    }
    // delete client
    await Client.deleteOne({ _id: findclient._id });
    // delete Supplier
    await Supplier.deleteOne({ client: findclient._id });

    res.status(200).send({ msg: "Client deleted", findclient });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "Can not delete Client", error }] });
  }
};

// Update client by id

exports.update_client = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    //   get modification
    const modification = req.body;
    //   find client
    const findclient = await Client.findOne({ _id: id });
    if (!findclient) {
      return res.status(400).send({ errors: [{ msg: "Client not found" }] });
    }
    // Update client
    const result = await Client.updateOne(
      { _id: findclient._id },
      { $set: { ...modification } }
    );
    res.status(200).send({ msg: "Client updated", result });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can not update Client", error }] });
  }
};

/* Products */

// GET All the  products
exports.get_products = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ msg: "Here is All the products", products });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can not get Products", error }] });
  }
};
// DELETE product by id

exports.delete_product = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    //   find product
    const findproduct = await Product.findOne({ _id: id });
    if (!findproduct) {
      return res.status(400).send({ errors: [{ msg: "Product not found" }] });
    }
    // delete product
    await Product.deleteOne({ _id: findproduct._id });
    res.status(200).send({ msg: "Product deleted", findproduct });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "Can not delete Product", error }] });
  }
};

/* Purchases */

// GET All the  purchases
exports.get_purchases = async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).send({ msg: "Here is All the Purchases", purchases });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can not get Purchases", error }] });
  }
};

// DELETE purchase
exports.delete_purchases = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;
    // find the purchase
    const findpurchase = await Purchase.findOne({ _id: id });
    if (!findpurchase) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Can not delete Purchase", error }] });
    }
    // delete purchase
    await Purchase.deleteOne({ _id: findpurchase._id });
    res.status(200).send({ msg: "Purchase deleted" });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "Can not delete Purchase", error }] });
  }
};

/* Suppliers */

// GET All the  Suppliers
exports.get_suppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).send({ msg: "Here is All the Suppliers", suppliers });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can not get Suppliers", error }] });
  }
};

// Initialise Supplier

exports.initialise_supplier = async (req, res) => {
  try {
    // get id from req.params
    const { id } = req.params;
    // find supplier
    const findsupplier = await Supplier.findOne({ _id: id });

    if (!findsupplier) {
      return res.status(400).send({ errors: [{ msg: "Supplier not found!" }] });
    }
    // Initialise supplier
    const initsupplier = await Supplier.updateOne(
      { _id: findsupplier._id },
      {
        $set: {
          society: false,
          societyname: "None",
          type: "None",
          phone: 10000000,
        },
      }
    );
    // Delete all the products of Supplier
    await Product.deleteMany({ supplier: findsupplier._id });
    res.status(200).send({ msg: "Supplier Initialised", initsupplier });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "Can not Initialise Suppliers", error }] });
  }
};

// UPDATE Supplier

exports.update_supplier = async (req, res) => {
  try {
    // get id from req.params
    const { id } = req.params;
    //   Get modification
    const modification = req.body;
    // find supplier
    const findsupplier = await Supplier.findOne({ _id: id });

    if (!findsupplier) {
      return res.status(400).send({ errors: [{ msg: "Supplier not found!" }] });
    }
    // Initialise supplier
    const initsupplier = await Supplier.updateOne(
      { _id: findsupplier._id },
      {
        $set: {
          ...modification,
        },
      }
    );

    res.status(200).send({ msg: "Supplier updated", initsupplier });
  } catch (error) {
    res
      .status(400)
      .send({ errors: [{ msg: "Can not Update Suppliers", error }] });
  }
};
