const express = require("express");
const router = express.Router();

const {
  sold_authorisation,
  get_supplier,
  add_product,
  delete_product,
  update_product,
  get_products_for_sold,
} = require("../Controllers/supplier.controller");

const {
  addValidation,
  validation,
  SupplierValidation,
} = require("../Middleware/supplier");
const { isAuth_Client } = require("../Middleware/auth_jwt");

// @Desc: Authorization to Sold products
// @Method: UPDATE
// @PATH: /api/supplier/sold_authorization
// DATA : req.header {token}

router.put(
  "/sold_authorization",
  isAuth_Client,
  SupplierValidation(),
  validation,
  sold_authorisation
);

// @Desc: GET THE SUPPLIER FROM CLIENT
// @Method: GET
// @PATH: /api/supplier/get_supplier
// DATA : req.header {token}

router.get("/get_supplier", isAuth_Client, get_supplier);

// @Desc: ADD Product
// @Method: POST
// @PATH: /api/supplier/add_product
// DATA : req.body {name,categorie,description,rating,price,barcode} req.header {token}

router.post(
  "/add_product",
  isAuth_Client,
  addValidation(),
  validation,
  add_product
);

// @Desc: DELETE Product
// @Method: DELETE
// @PATH: /api/supplier/delete_product/:id
// DATA : req.params {id} req.header {token}

router.delete("/delete_product/:id", isAuth_Client, delete_product);

// @Desc: UPDATE Product
// @Method: UPDATE
// @PATH: /api/supplier/update_product/:id
// DATA : req.params {id}, req.body {modification} req.header {token}

router.put("/update_product/:id", isAuth_Client, update_product);

// @Desc: GET  Products for sold
// @Method: GET
// @PATH: /api/supplier/get_products
// DATA : req.header {token}

router.get("/get_products", isAuth_Client, get_products_for_sold);

module.exports = router;
