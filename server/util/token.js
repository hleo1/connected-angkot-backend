require("dotenv").config({path: __dirname+'/./../../.env'});
const jwt = require("jsonwebtoken");

const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "2d",
    }
  );
};

const verifyToken = (token) => {
  return new Promise((resolve, _reject) => {
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      { algorithms: ["HS256"] },
      (err, _decoded) => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      }
    );
  });
};

const decodeToken = (token) => {
    const decoded = jwt.decode(token);
    return decoded;
  }
  

module.exports = {
  createToken,
  verifyToken,
  decodeToken
};
