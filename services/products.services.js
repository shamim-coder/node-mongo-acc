const Product = require("../models/Product");

// get products
exports.getProductsService = async () => {
    // const product = await Product.find({ $and: [{ price: { $gt: 400 }, quantity: { $eq: 0 } }] }).sort({ quantity: -1 });

    // const product = await Product.find().sort({ quantity: -1 }).select("price name quantity");

    // const product = await Product.where("price").gt(400);

    const products = await Product.find({});
    return products;
};

// create product
exports.createProductService = async (data) => {
    // two way to insert data input server > save or create

    // using create method
    // const result = await Product.create(data);

    // using save method
    const product = new Product(data);
    // instance creation > do something > save()
    const result = await product.save();

    return result;
};

// update product
exports.updateProductService = async (req) => {
    const { id } = req.params;
    const data = req.body;
    const result = await Product.updateOne({ _id: id }, { $set: data }, { runValidators: true });

    // save() method way to update product
    // const product = await Product.findById(id);
    // const result = await product.set(data).save();

    return result;
};

// Bulk Update Service
exports.bulkUpdateProductService = async (req) => {
    const data = req.body;
    // const productIds = await Product.find({}, "_id");
    // const result = await Product.updateMany({ _id: productIds }, { $set: data.data }, { runValidators: true });

    // bulk update for each changes for each values.
    const products = [];
    data.forEach((product) => {
        products.push(Product.updateOne({ _id: product.id }, { $set: product.data }));
    });

    const result = await Promise.all(products);

    return result;
};
