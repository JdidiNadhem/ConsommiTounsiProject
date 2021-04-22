const express = require("express");
const router = express.Router();

const {
  registerValidation,
  loginValidation,
  // reviewvalidation,
  // purchaseValidation,
  validation,
} = require("../Middleware/client");

const {
  Register_client,
  Login_client,
  add_review,
  get_purchases,
  purchase_products,
  delete_purchase,
} = require("../Controllers/client.controller");

const { isAuth_Client } = require("../Middleware/auth_jwt");
// @Desc: Register
// @Method: POST
// @PATH: /api/client/register
// DATA : cin,fullname,phone,adress,email,password

router.post("/register", registerValidation(), validation, Register_client);

// @Desc: Login
// @Method: POST
// @PATH: /api/client/login
// DATA : email,password

router.post("/login", loginValidation(), validation, Login_client);

// @Desc:ADD REVIEW
// @Method: POST
// @PATH: /api/client/add_review/:id
// DATA : req.body{rating,comment} Header{token} req.params{id product}

router.post("/add_review/:id", isAuth_Client, add_review);

//@Desc: GET Purchases
// @Method: GET
// @PATH: /api/client/get_purchase

router.get("/get_purchases", isAuth_Client, get_purchases);

//@Desc: Purchase products
// @Method: POST
// @PATH: /api/client/purchase
//DATA: req.body{products,shippingAdress}
router.post(
  "/purchase",
  isAuth_Client,
  // purchaseValidation,
  // validation,
  purchase_products
);

//@Desc: DELETE PURCHASE
// @Method: DELETE
// @PATH: /api/client/delete_purchase/:id
//DATA: req.params{id}
router.delete("/delete_purchase/:id", isAuth_Client, delete_purchase);

router.get("/current", isAuth_Client, (req, res) => {
  res.send(req.client);
});

module.exports = router;
