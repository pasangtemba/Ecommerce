const express = require("express");
const {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../contollers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllproducts);

router
  .route("admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route("/product/:id").put(isAuthenticatedUser, updateProduct);

router.route("/product/:id").delete(isAuthenticatedUser, deleteProduct);

router.route("/product/:id").get(getProductDetail);

router.route("/reviews").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
module.exports = router;
