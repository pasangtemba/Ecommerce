const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  isAuthenticatedUser,
  updatePassword,
  updateProfile,
  getAlluser,
  getSingleUser,
  updateUserRole,
} = require("../contollers/userController");
const { authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser , updatePassword);
router.route("/password/update").put(isAuthenticatedUser , updateProfile);
router.route("admin/user").get(isAuthenticatedUser,authorizeRoles("amin"),getAlluser);
router.route("admin/user").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser);

module.exports = router;
