const { getProductsService, createProductService, updateProductService } = require("../services/products.services");

exports.getProducts = async (req, res, next) => {
    try {
        // const product = await Product.find({ $and: [{ price: { $gt: 400 }, quantity: { $eq: 0 } }] }).sort({ quantity: -1 });

        // const product = await Product.find().sort({ quantity: -1 }).select("price name quantity");

        // const product = await Product.where("price").gt(400);
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

exports.createProduct = async (req, res, next) => {
    try {
        // two way to insert data input server > save or create

        const result = await createProductService(req.body);

        // using create method
        // const result = await Product.create(req.body);

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
