// Import product category model
const ProductCategoryModel = require("../models/product_category.model");

// Request input validator
const Joi = require("joi");

// get all product categories
exports.getAll = (req, res) => {
  ProductCategoryModel.getAll((productCategories, err) => {
    if (err) return res.status(400).send(err.message);
    res.send(productCategories);
  });
};

// get product category by ID
exports.getByID = (req, res) => {
  // Validate id
  validateId(req, res);

  ProductCategoryModel.getByID(req.params.id, (productCategory, err) => {
    if (err) return res.status(400).send(err.message);
    res.send(productCategory);
  });
};

// create new product
exports.create = (req, res) => {
  // Validate request data
  validateReqData(req, res);

  const reqData = new ProductCategoryModel(req.body);
  ProductCategoryModel.create(reqData, (productCategory, err) => {
    if (err) return res.status(400).send(err.message);
    res.json({
      status: true,
      message: "Product Category Created Successfully",
      id: productCategory.insertId,
    });
  });
};

// update product category (requires all columns to be present in the request)
exports.update = (req, res) => {
  // Validate request data
  validateReqData(req, res);
  // Validate id
  validateId(req, res);

  const reqData = new ProductCategoryModel(req.body);
  ProductCategoryModel.update(
    req.params.id,
    reqData,
    (productCategory, err) => {
      if (err) return res.status(400).send(err.message);
      res.json({
        status: true,
        message: "Product Category updated Successfully",
      });
    }
  );
};

// delete product category
exports.delete = (req, res) => {
  // Validate id
  validateId(req, res);

  ProductCategoryModel.delete(req.params.id, (productCategory, err) => {
    if (err) return res.status(400).send(err.message);
    res.json({
      success: true,
      message: "Product Category deleted successully!",
    });
  });
};

// Validation methods
//---------------

// Product category data validation
function validateReqData(req, res) {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error);
  }
}

// Product category id validation
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
