const { validationResult, check } = require("express-validator");

exports.addValidation = () => [
  check("name", "Name is required").not().isEmpty(),
  check("categorie", "Categorie is required").not().isEmpty(),
  check("description", "Description is required").not().isEmpty(),
  check("price", "Price is required").not().isEmpty(),
  check("image", "Image is required").not().isEmpty(),
];

exports.SupplierValidation = () => [
  check("societyname", "Society Name is required").not().isEmpty(),
  check("type", "Society Type is required").not().isEmpty(),
  check("phone", "Phone is required").not().isEmpty(),
  check("phone", "Phone must contain 8 numbers").isLength({ min: 8, max: 8 }),
];

exports.validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
