// Import user model
const UserModel = require("../models/user.model");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// Request input validator
const Joi = require("joi");

// Register
exports.register = (req, res) => {
  // Validation
  const schema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error);
  }

  const body = req.body;
  const salt = genSaltSync(10);
  body.password = hashSync(req.body.password, salt);
  const reqData = new UserModel(req.body);
  UserModel.create(reqData, (user, err) => {
    if (err) return res.status(409).send(err.message);
    res.json({
      status: true,
      message: "User Created Successfully",
      id: user.insertId,
    });
  });
};

// Login
exports.login = (req, res) => {
  // Validation
  const schema = Joi.object({
    login: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).send(validation.error);
  }

  UserModel.getByLogin(req.body.login, (user, err) => {
    if (err || user === "undefined" || user.length === 0)
      return res
        .status(404)
        .send(err ? err.message : "Access Denied! Unauthorized User");
    // Grab the first element in the result
    user = user[0];
    const result = compareSync(req.body.password, user.password);
    if (result) {
      user.password = undefined;
      const expiresIn = "1d";
      const jsontoken = sign(
        { result: user },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: expiresIn,
        }
      );
      return res.json({
        success: 1,
        message: "Login successfully",
        token: jsontoken,
        expiresIn: expiresIn,
      });
    } else {
      return res.status(401).send("Access Denied! Unauthorized User");
    }
  });
};
