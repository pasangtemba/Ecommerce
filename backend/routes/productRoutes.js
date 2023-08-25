const express = require("express");
const {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
} = require("../contollers/productController");
const router = express.Router();

router.route("/products").get(getAllproducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct);

router.route("/product/:id").delete(deleteProduct);

router.route("/product/:id").get(getProductDetail);

module.exports = router;
