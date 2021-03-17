const mysql = require("mysql");

// Mysql connection
const dbConn = mysql.createConnection({
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || "3306",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASS || "",
  database: process.env.MYSQL_DB || "room4_test_db",
  connectTimeout: process.env.MYSQL_CONNECTION_TIMEOUT * 1000,
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Database Connected Successfully!!!:");
});

// Create tables if they dont exist already
// users table
dbConn.query(
  "CREATE  TABLE IF NOT EXISTS `users` (`id` BIGINT UNSIGNED AUTO_INCREMENT, `name` VARCHAR(255) NOT NULL, `login` VARCHAR(255) UNIQUE NOT NULL, `password` VARCHAR(255) NOT NULL, `deleted_at` DATETIME DEFAULT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = InnoDB;",
  (err, res) => {
    if (err) {
      console.log("Error while creating table");
    } else {
      console.log("Users table was created or already exists");
    }
  }
);

// product_categories table
dbConn.query(
  "CREATE  TABLE IF NOT EXISTS `product_categories` ( `id` BIGINT UNSIGNED AUTO_INCREMENT, `name` VARCHAR(255) UNIQUE NOT NULL, `deleted_at` DATETIME DEFAULT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE = InnoDB;",
  (err, res) => {
    if (err) {
      console.log("Error while creating table");
    } else {
      console.log("Product categories table was created or already exists");
    }
  }
);

// products table
dbConn.query(
  "CREATE  TABLE IF NOT EXISTS `products` ( `id` BIGINT UNSIGNED AUTO_INCREMENT, `product_category_id` BIGINT UNSIGNED NOT NULL, `name` VARCHAR(255) NOT NULL, `description` VARCHAR(255), `price_per_unit` FLOAT NOT NULL, `quantity_in_stock` INT NOT NULL, `deleted_at` DATETIME DEFAULT NULL, `created_at` DATETIME NOT NULL, `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (`id`), Foreign Key(`product_category_id`) references product_categories(`id`)) ENGINE = InnoDB;",
  (err, res) => {
    if (err) {
      console.log("Error while creating table");
    } else {
      console.log("Products table was created or already exists");
    }
  }
);

module.exports = dbConn;
