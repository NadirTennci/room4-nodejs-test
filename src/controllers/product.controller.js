// Import product model
const ProductModel = require("../models/product.model");

// Request input validator
const Joi = require("joi");

// get all products
exports.getAll = (req, res) => {
  ProductModel.getAll((products, err) => {
    if (err) return res.status(400).send(err.message);
    res.send(products);
  });
};

// get product by ID
exports.getByID = (req, res) => {
  // Validate id
  validateId(req, res);

  ProductModel.getByID(req.params.id, (product, err) => {
    if (err) return res.status(400).send(err.message);
    res.send(product);
  });
};

// create new product
exports.create = (req, res) => {
  // Validate request data
  validateReqData(req, res);

  const reqData = new ProductModel(req.body);
  ProductModel.create(reqData, (product, err) => {
    if (err) return res.status(400).send(err.message);
    res.json({
      status: true,
      message: "Product Created Successfully",
      id: product.insertId,
    });
  });
};

// update product (requires all columns to be present in the request)
exports.update = (req, res) => {
  // Validate request data
  validateReqData(req, res);
  // Validate id
  validateId(req, res);

  const reqData = new ProductModel(req.body);
  ProductModel.update(req.params.id, reqData, (product, err) => {
    if (err) return res.status(400).send(err.message);
    res.json({ status: true, message: "Product updated Successfully" });
  });
};

// delete product
exports.delete = (req, res) => {
  // Validate id
  validateId(req, res);

  ProductModel.delete(req.params.id, (product, err) => {
    if (err) return res.status(400).send(err.message);
    res.json({ success: true, message: "Product deleted successully!" });
  });
};

// Validation methods
//---------------

// Product data validation
function validateReqData(req, res) {
  // Validation
  const schema = Joi.object({
    product_category_id: Joi.number().integer().greater(0).required(),
    name: Joi.string().required(),
    description: Joi.string(),
    price_per_unit: Joi.number().required(),
    quantity_in_stock: Joi.number().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error);
  }
}

// Product id validation
function validateId(req, res) {
  // Validation
  const schema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
  });

  const validation = schema.validate({ id: req.params.id });
  if (validation.error) {
    return res.status(400).send(validation.error);
  }
}

//----------------
