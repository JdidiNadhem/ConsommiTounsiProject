const express = require("express");
const router = express.Router();

const {
  Get_all_products,
  Get_product_by_id,
} = require("../Controllers/products.controller");

// @Desc: Get all the products
// @Method: GET
// @PATH: /api/products

router.get("/", Get_all_products);

// @Desc: GET PRODUCT BY ID
// @Method: GET
// @PATH: /api/products/get_product/:id
//Data req.params{id}

router.get("/get_product/:id", Get_product_by_id);

module.exports = router;
