const express = require("express");
const router = express.Router();

const { getProducts, createProduct, updateProduct } = require("../controllers/product.controllers");

router.route("/").get(getProducts).post(createProduct);

router.route("/:id").patch(updateProduct);

module.exports = router;
