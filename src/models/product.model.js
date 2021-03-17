var dbConn = require("../config/db.config");

var Product = function (product) {
  this.product_category_id = product.product_category_id;
  this.name = product.name;
  this.description = product.description ?? "";
  this.price_per_unit = product.price_per_unit;
  this.quantity_in_stock = product.quantity_in_stock;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// get all products
Product.getAll = (result) => {
  dbConn.query(
    "SELECT * FROM products WHERE `deleted_at` IS NULL",
    (err, res) => {
      if (err) {
        console.log("Error while fetching products", err);
        result(null, err);
      } else {
        console.log("Products fetched successfully");
        result(res, null);
      }
    }
  );
};

// get product by ID from DB
Product.getByID = (id, result) => {
  dbConn.query(
    "SELECT * FROM products WHERE id=? and `deleted_at` IS NULL",
    id,
    (err, res) => {
      if (err) {
        console.log("Error while fetching products by id", err);
        result(null, err);
      } else {
        result(res, null);
      }
    }
  );
};

// create new product
Product.create = (productReqData, result) => {
  dbConn.query("INSERT INTO products SET ? ", productReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Product created successfully");
      result(res, null);
    }
  });
};

// update product
Product.update = (id, productReqData, result) => {
  dbConn.query(
    "UPDATE products SET name=?,description=?,price_per_unit=?,quantity_in_stock=? WHERE id = ?",
    [
      productReqData.name,
      productReqData.description,
      productReqData.price_per_unit,
      productReqData.quantity_in_stock,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("Error while updating the product");
        result(null, err);
      } else {
        console.log("Product updated successfully");
        result(res, null);
      }
    }
  );
};

// delete product
Product.delete = (id, result) => {
  // dbConn.query('DELETE FROM products WHERE id=?', [id], (err, res)=>{
  //     if(err){
  //         console.log('Error while deleting the product');
  //         result(null, err);
  //     }else{
  //         result(res, null);
  //     }
  // })
  dbConn.query(
    "UPDATE products SET deleted_at=? WHERE id = ?",
    [new Date(), id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the product");
        result(null, err);
      } else {
        console.log("Product deleted successfully");
        result(res, null);
      }
    }
  );
};

module.exports = Product;
