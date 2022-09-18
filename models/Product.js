const mongoose = require("mongoose");

// schema design
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: [true, "Name already exist"],
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [20, "Name should be maximum 20 characters"],
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: [true, "Price is Required"],
            min: [0, "Price can't be negative"],
        },
        quantity: {
            type: Number,
            required: [true, "Product Quantity is require"],
            min: [0, "Quantity can't be negative"],
        },
        unit: {
            type: String,
            required: true,
            enum: {
                values: ["kg", "litre", "pcs"],
                message: "unit value can't be {VALUE}, must be kg/litre/pcs",
            },
        },
        status: {
            type: String,
            default: "in-stock",
            enum: {
                values: ["in-stock", "out-of-stock", "low-stock"],
            },
        },
        // supplier: {
        //     type: Schema.Types.ObjectId,
        //     ref: "Supplier",
        // },
        // // embed
        // categories: [
        //     {
        //         name: {
        //             type: String,
        //             required: [true, "Name is required"],
        //         },
        //         _id: Schema.Types.ObjectId,
        //     },
        // ],
    },
    { timestamps: true }
);

// mongoose middleware for saving data: pre / post
productSchema.pre("save", function (next) {
    if (this.quantity == 0) {
        this.status = "out-of-stock";
    } else {
        this.status = "in-stock";
    }
    next();
});

productSchema.post("save", function (doc, next) {
    console.log("after saving data");
    next();
});

// // instance
// productSchema.methods.logger = function () {
//     console.log(`Data save from ${this.name}`);
// };

// Steps : Schema =>  Model   =>  Query
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
