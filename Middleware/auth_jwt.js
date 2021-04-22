const jwt = require("jsonwebtoken");
const Client = require("../Models/Client");
const Supplier = require("../Models/Supplier");

exports.isAuth_Client = async (req, res, next) => {
  try {
    // test token
    const token = req.headers["authorization"];

    // if the token is undefined =>
    if (!token) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }
    // get the id from the token
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);

    // search the Client
    const client = await Client.findById(decoded.id).select("-password");
    // send not authorisation IF NOT Client
    if (!client) {
      return res.status(400).send({ errors: [{ msg: "Unauthorized" }] });
    }

    // if client exist
    req.client = client;

    next();
  } catch (error) {
    return res.status(500).send({ errors: [{ msg: "Unauthorized" }] });
  }
};
