const catchAcyncError = require("./catchAcyncError");
const ErrorHandler = require("../utils/errorhandler");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAcyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  const decodedDate = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userInfo.findById(decodedDate.id);
  next();
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
