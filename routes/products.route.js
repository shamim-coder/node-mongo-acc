const express = require("express");
const router = express.Router();

const { getProducts, createProduct, updateProduct, bulkUpdateProduct } = require("../controllers/product.controllers");

router.route("/").get(getProducts).post(createProduct);

router.route("/bulk-update").patch(bulkUpdateProduct);

router.route("/:id").patch(updateProduct);

module.exports = router;
