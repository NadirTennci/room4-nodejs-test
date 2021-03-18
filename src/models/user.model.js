var dbConn = require("../config/db.config");

var User = function (user) {
  this.name = user.name;
  this.login = user.login;
  this.password = user.password;
  this.created_at = new Date();
  this.updated_at = new Date();
};

// get all users
User.getAll = (result) => {
  dbConn.query("SELECT * FROM users WHERE `deleted_at` IS NULL", (err, res) => {
    if (err) {
      console.log("Error while fetching users", err);
      result(null, err);
    } else {
      console.log("Users fetched successfully");
      result(res, null);
    }
  });
};

// get users by ID
User.getByID = (id, result) => {
  dbConn.query(
    "SELECT * FROM users WHERE id=? and `deleted_at` IS NULL",
    id,
    (err, res) => {
      if (err) {
        console.log("Error while fetching users by id", err);
        result(null, err);
      } else {
        result(res, null);
      }
    }
  );
};

// get users by login
User.getByLogin = (login, result) => {
  dbConn.query(
    "SELECT * FROM users WHERE login=? and `deleted_at` IS NULL",
    login,
    (err, res) => {
      if (err) {
        console.log("Error while fetching users by login", err);
        result(null, err);
      } else {
        result(res, null);
      }
    }
  );
};

// create new user
User.create = (userReqData, result) => {
  dbConn.query("INSERT INTO users SET ? ", userReqData, (err, res) => {
    if (err) {
      console.log("User already exists");
      result(null, err);
    } else {
      console.log("User created successfully");
      result(res, null);
    }
  });
};

// update user
User.update = (id, userReqData, result) => {
  dbConn.query(
    "UPDATE users SET name=?,login=?,password=? WHERE id = ?",
    [userReqData.name, userReqData.login, userReqData.password, id],
    (err, res) => {
      if (err) {
        console.log("Error while updating the user");
        result(null, err);
      } else {
        console.log("User updated successfully");
        result(res, null);
      }
    }
  );
};

// delete user
User.delete = (id, result) => {
  // dbConn.query('DELETE FROM users WHERE id=?', [id], (err, res)=>{
  //     if(err){
  //         console.log('Error while deleting the user');
  //         result(null, err);
  //     }else{
  //         result(res, null);
  //     }
  // })
  dbConn.query(
    "UPDATE users SET deleted_at=? WHERE id = ?",
    [new Date(), id],
    (err, res) => {
      if (err) {
        console.log("Error while deleting the user");
        result(null, err);
      } else {
        console.log("User deleted successfully");
        result(res, null);
      }
    }
  );
};

module.exports = User;
