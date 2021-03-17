const jwt = require("jsonwebtoken");
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(401).send("Access Denied! Unauthorized User");
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(401).send("Access Denied! Unauthorized User");
    }
  },
};
