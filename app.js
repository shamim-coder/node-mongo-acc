const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { timeStamp } = require("console");

// middleware
app.use(express.json());
app.use(cors());

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

// Steps : Schema =>  Model   =>  Query

const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
    res.send("Route is working!");
});

app.post("/", async (req, res, next) => {
    try {
        // two way to insert data input server > save or create

        // using save method
        // const product = new Product(req.body);
        // const result = await product.save();

        // using create method
        const result = await Product.create(req.body);

        res.status(200).send({
            success: true,
            message: "Data inserted successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});

module.exports = app;
