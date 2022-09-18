const Product = require("../models/Product");

exports.getProductsService = async () => {
    const products = await Product.find({});
    return products;
};

exports.createProductService = async (data) => {
    // using save method
    const product = new Product(data);
    // instance creation > do something > save()
    const result = await product.save();
    return result;
};

exports.updateProductService = async (req) => {
    const { id } = req.params;
    const data = req.body;
    const result = await Product.updateOne({ _id: id }, { $set: data });
    return result;
};
