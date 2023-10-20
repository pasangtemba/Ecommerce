const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAcyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


//Registration of user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profilepic",
    },
  });

  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //Check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //Check if password is correct or not

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

//Logout user => /api/v1/logout

exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expirea: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

//Forgot Password => /api/v1/password/forgot

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Invalid Email", 404));
  }

  const resetToken = user.getResetPasswordToken();

  
  user.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
       "host"
         )}/api/v1/password/reset/${resetToken}`;
  const message = `Hello,
       \nPlease use this link to reset your password:-\n ${resetPasswordUrl}
        \nIf you have not reset password ignor it`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} sucessfully`,
    });

  }
  catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
  
});

//Reset Password => /api/v1/password/reset/:token

exports.resetPassword = catchAsyncError(async (req, res, next) => {

  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await user.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Password reset token is invalid or has been expired", 400)
    );
  }
   
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
    
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();
sendToken(user,200,res);
});

// user detail
exports.getUserDetails = catchAsyncError(async(req , res, next) => {
 const user = await User.findById(req.user.id);
 res.status(200).json({
   success: true,
   data: user,
 });
})

// update user password
exports.updatePassword = catchAsyncError(async(req , res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("old  Password is incorrect", 401));
  }
  if ( req.body.newPassword !== re.body.confirmPassword)
  {
    return next(new ErrorHandler("Password does not match",401));
  }
    user.password = req.body.newPassword;
     await user.save();

  sendToken(user, 200, res);
});

// update user Details
exports.updateProfile = catchAsyncError(async(req , res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // we will use cloudinaey leter
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
 
  res.status(200).json({
    success: true,

  });
});
// get all user (admin)

exports.getAlluser = catchAsyncError(async(req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    user,
  });
});


// get single  user (admin)
exports.getSingleUser = catchAsyncError(async(req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
  {
    return next(new ErrorHandler("User not found",404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});



// update user Roles -- admin
exports.updateUserRole = catchAsyncError(async(req , res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
 
  res.status(200).json({
    success: true,

  });
});

// delete user  -- admin
exports.deleteUser= catchAsyncError(async(req , res, next) => {
  const user = await user.findById(req.params.id);
  if (!user)
  {
    return next(new ErrorHandler("User not found",404));
  }
  await user.remove();

  // we will remove cloudinaey leter
  
  res.status(200).json({
    success: true,
    message: "User deleted successfully",

  });
});