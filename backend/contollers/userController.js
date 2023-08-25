const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAcyncError");
const user = require("../models/userModel");

//Registration of user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const [name, email, password] = req.body;
  const user = await user.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepic.jpg",
    },
  });
  res.status(201).json({
    success: true,
    user,
  });
});
