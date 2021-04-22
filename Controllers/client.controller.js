const Client = require("../Models/Client");
const Supplier = require("../Models/Supplier");
const Review = require("../Models/Review");
const Product = require("../Models/Product");
const Purchase = require("../Models/Purchase");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

exports.Register_client = async (req, res) => {
  try {
    // req.body {cin,fullname,phone,adress,email,password}
    const client = req.body;
    // check if the email is not found in the database
    const clientfound = await Client.findOne({ email: client.email });

    if (clientfound) {
      res.status(400).send({ errors: [{ msg: "Client already registered!" }] });
      return;
    }

    const newclient = new Client({
      ...client,
    });

    // Hash password
    const hashedpassword = bcrypt.hashSync(client.password, salt);
    newclient.password = hashedpassword;

    // create a token using json webtoken
    const token = jwt.sign(
      {
        id: newclient._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    // Save the client
    await newclient.save();
    //   Save the Supplier
    const newsupplier = new Supplier({
      client: newclient,
      society: false,
      societyname: "None",
      type: "None",
      phone: 10000000,
    });
    await newsupplier.save();
    res
      .status(200)
      .send({ msg: "Client saved successfully", Client: newclient, token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not save the Client" }] });
  }
};

exports.Login_client = async (req, res) => {
  try {
    // req.body email,password
    const { email, password } = req.body;

    // Check if client exist
    const findclient = await Client.findOne({ email });

    if (!findclient) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // Check password
    const result = await bcrypt.compare(password, findclient.password);

    if (!result) {
      res.status(400).send({ errors: [{ msg: "Bad Credential" }] });
      return;
    }
    // if everything true
    // create Token
    const token = jwt.sign(
      {
        id: findclient._id,
      },
      process.env.SECRET_KEY,
      { expiresIn: "2d" }
    );
    // send the details + a token
    res
      .status(200)
      .send({ msg: "authentification success", Client: findclient, token });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "can not get the Client", error }] });
  }
};

exports.add_review = async (req, res) => {
  try {
    // Get data from req.body
    const { rating, comment } = req.body;
    // Get product id from req.params
    const { id } = req.params;
    // Get client
    const client = req.client;

    const name = client.fullname;
    //   Add review to the product
    const findproduct = await (await Product.findById(id)).populate("review");
    if (findproduct) {
      const alreadyreviewed = findproduct.reviews.find(
        (rev) => rev.client.toString() === client._id.toString()
      );
      if (alreadyreviewed) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Product already reviewed" }] });
      }
      // ADD review
      const newReview = new Review({ client, name, rating, comment });
      await newReview.save();
      findproduct.reviews.push(newReview);
      findproduct.numReview = findproduct.reviews.length;
      findproduct.rating =
        findproduct.reviews.reduce((acc, item) => item.rating + acc, 0) /
        findproduct.reviews.length;
      await findproduct.save();
      res.status(200).send({ msg: "Review added successfully" });
    } else {
      return res.status(400).send({ errors: [{ msg: "Product not found!" }] });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "can not Add Review!", error }] });
  }
};

exports.purchase_products = async (req, res) => {
  try {
    // get data

    const client = req.client;

    const { products, shippingadress, total } = req.body;

    const purchaseDate = new Date();

    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    let shippingDate = new Date().addDays(3);

    // save purchase
    const newpurchase = new Purchase({
      client,
      products,
      shippingadress,
      total,
      purchaseDate,
      shippingDate,
    });

    newpurchase.save();

    res.status(200).send({ msg: "Purchase done!", newpurchase });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can not have purchase", error }] });
  }
};

exports.get_purchases = async (req, res) => {
  try {
    const result = await Purchase.find().populate("client");
    if (!result) {
      res.status(400).send({ errors: [{ msg: "Can not get purchases" }] });
    }
    res.status(200).send({ msg: "Here is all purchases", purshases: result });
  } catch (error) {
    res.status(400).send({ errors: [{ msg: "Can not get purchases", error }] });
  }
};

exports.delete_purchase = async (req, res) => {
  try {
    // Get client
    const client = req.client;
    // Get id
    const { id } = req.params;
    // Verify shipping date
    const findpurchase = await Purchase.findOne({
      _id: id,
      client: client._id,
    });
    if (!findpurchase) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Purchase not found! " }] });
    }
    const { shippingDate } = findpurchase;
    const today = new Date();
    if (shippingDate.getTime() < today.getTime()) {
      return res.status(400).send({ errors: [{ msg: "Already shipped! " }] });
    }

    // Delete purchase
    await Purchase.deleteOne({ _id: id });

    res.status(200).send({ msg: "Purchase deleted" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ errors: [{ msg: "Can not delete purchase", error }] });
  }
};
