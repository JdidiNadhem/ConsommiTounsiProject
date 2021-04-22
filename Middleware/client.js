const { validationResult, check } = require("express-validator");

exports.registerValidation = () => [
  check("cin", "CIN is required").not().isEmpty(),
  check("cin", "CIN must have 8 numbers").isLength({ min: 8, max: 8 }),
  check("fullname", "Fullname is required").not().isEmpty(),

  check("phone", "Phone is required").not().isEmpty(),
  check("phone", "Phone must have 8 or more numbers").isLength({ min: 8 }),
  check("adress", "Adress is required").not().isEmpty(),
  check("email", "Email is required").not().isEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
  check("password", "Password length must be more than 5 caracters").isLength({
    min: 6,
  }),
];

exports.loginValidation = () => [
  check("email", "Email is required").not().isEmpty(),
  check("email", "Enter a valid email").isEmail(),
  check("password", "password should not be empty").not().isEmpty(),
];

exports.reviewvalidation = () => [
  check("rating", "Rating is required").not().isEmpty(),
  check("comment", "Comment is required").not().isEmpty(),
];

exports.purchaseValidation = () => [
  check("cartnumber", "Cart Number is required").not().isEmpty(),
  check("cvv", "CVV Code is required").not().isEmpty(),
  check("products", "There is no products to purchase").not().isEmpty(),
  check("shippingAdress", "Shipping Adress is required").not().isEmpty(),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
