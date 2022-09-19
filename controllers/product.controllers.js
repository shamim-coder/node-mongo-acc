const { getProductsService, createProductService, updateProductService, bulkUpdateProductService } = require("../services/products.services");

// Get Products
exports.getProducts = async (req, res, next) => {
    try {
        const products = await getProductsService();

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
};

// Create Product
exports.createProduct = async (req, res, next) => {
    try {
        const result = await createProductService(req.body);

        res.status(200).send({
            success: true,
            message: "Product inserted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
};

// Update Product
exports.updateProduct = async (req, res, next) => {
    try {
        const result = await updateProductService(req);

        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Couldn't update the product",
            error: error.message,
        });
    }
};

// Bulk Update Products
exports.bulkUpdateProduct = async (req, res, next) => {
    try {
        const result = await bulkUpdateProductService(req);

        res.status(200).send({
            success: true,
            message: "Product updated successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Couldn't update the product",
            error: error.message,
        });
    }
};
