const { number } = require("joi");
var dbConn = require("../config/db.config");

var ProductCategory = function (productCategory) {
  this.name = productCategory.name;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// get all product categories
ProductCategory.getAll = (result) => {
  dbConn.query(
    "SELECT * FROM product_categories WHERE `deleted_at` IS NULL",
    (err, res) => {
      if (err) {
        console.log("Error while fetching product categories", err);
        result(null, err);
      } else {
        console.log("Product categories fetched successfully");
        result(res, null);
      }
    }
  );
};

// get product category by ID from DB
ProductCategory.getByID = (id, result) => {
  dbConn.query(
    "SELECT * FROM product_categories WHERE id=? and `deleted_at` IS NULL",
    id,
    (err, res) => {
      if (err) {
        console.log("Error while fetching product category by id", err);
        result(null, err);
      } else {
        result(res, null);
      }
    }
  );
};

// create new product category
ProductCategory.create = (productCategoryReqData, result) => {
  dbConn.query(
    "INSERT INTO product_categories SET ? ",
    productCategoryReqData,
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        console.log("Product category created successfully");
        result(res, null);
      }
    }
  );
};

// update product category
ProductCategory.update = (id, productCategoryReqData, result) => {
  dbConn.query(
    "UPDATE product_categories SET name=? WHERE id = ?",
    [productCategoryReqData.name, id],
    (err, res) => {
      if (err) {
        console.log("Error while updating the product category");
        result(null, err);
      } else {
        console.log("Product category updated successfully");
        result(res, null);
      }
    }
  );
};

// delete product category
ProductCategory.delete = (id, result) => {
  // dbConn.query('DELETE FROM product_categories WHERE id=?', [id], (err, res)=>{
  //     if(err){
  //         console.log('Error while deleting the product category');
  //         result(null, err);
  //     }else{
  //         result(res, null);
  //     }
  // })
  dbConn.query(
    "UPDATE product_categories SET deleted_at=? WHERE id = ?",
    [new Date(), id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the product category");
        result(null, err);
      } else {
        console.log("Product category deleted successfully");
        result(res, null);
      }
    }
  );
};

module.exports = ProductCategory;
