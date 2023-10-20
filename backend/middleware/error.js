const ErrorHandler = require("../utils/errorhandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong mongoDB ID error
  if (err.name === "castError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
// mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  //JWT ERROR
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web Token is invalid. Try Again!!!";
    err = new ErrorHandler(err.message, 401);
 
  }
  //JWT ecpire error
  if(err.name==="TOkenExpireError")
  {
    const message = "Your token has expired. Please login again";
    err = new ErrorHandler(message, 401);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
