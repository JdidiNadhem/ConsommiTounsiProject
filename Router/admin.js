const express = require("express");
const router = express.Router();

const {
  get_clients,
  delete_client,
  update_client,
  get_products,
  delete_product,
  get_purchases,
  delete_purchases,
  get_suppliers,
  initialise_supplier,
  update_supplier,
} = require("../Controllers/admin.controller");

/*******************************/
//Clients
/*******************************/

// @Desc: GET ALL CLIENTS
// @Method: GET
// @PATH: /api/admin/get_clients

router.get("/get_clients", get_clients);

// @Desc: DELETE CLIENT BY ID
// @Method: DELETE
// @PATH: /api/admin/delete_client/:id
//DATA : req.params{id}

router.delete("/delete_client/:id", delete_client);

// @Desc: UPDATE CLIENT BY ID
// @Method: PUT
// @PATH: /api/admin/update_client/:id
// DATA: req.body{modification} req.params{id}

router.put("/update_client/:id", update_client);

/*******************************/
//Products
/*******************************/

// @Desc: GET ALL PRODUCTS
// @Method: GET
// @PATH: /api/admin/get_products

router.get("/get_products", get_products);

// @Desc:  DELETE product by id
// @Method: DELETE
// @PATH: /api/admin/delete_product/:id
//DATA : req.params{id}

router.delete("/delete_product/:id", delete_product);

/*******************************/
//Purchases
/*******************************/

// @Desc: GET ALL PURCHASES
// @Method: GET
// @PATH: /api/admin/get_purchases

router.get("/get_purchases", get_purchases);

// @Desc: DELETE PURCHASE by id
// @Method: DELETE
// @PATH: /api/admin/delete_purchase/:id
//DATA : req.params{id}

router.delete("/delete_purchase/:id", delete_purchases);

/*******************************/
//Suppliers
/*******************************/

// @Desc: GET ALL SUPPLIERS
// @Method: GET
// @PATH: /api/admin/get_suppliers

router.get("/get_suppliers", get_suppliers);

// @Desc: INITIALISE SUPPLIER
// @Method: PUT
// @PATH: /api/admin/initialise_supplier/:id"
//DATA : req.params{id}
router.put("/initialise_supplier/:id", initialise_supplier);

// @Desc: UPDATE SUPPLIER
// @Method: PUT
// @PATH: /api/admin/update_supplier/:id"
//DATA:  req.body{modification}  req.params{id}

router.put("/update_supplier/:id", update_supplier);

module.exports = router;
