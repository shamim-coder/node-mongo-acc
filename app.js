const express = require("express");
const app = express();
const cors = require("cors");
const { Schema } = require("mongoose");
const { timeStamp } = require("console");

// middleware
app.use(express.json());
app.use(cors());

// schema design
const productSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, "Name is Required"],
            trim: true,
            unique: [true, "Name already exist"],
            minLength: [3, "Name must be at least 3 characters"],
            maxLength: [20, "Name should be maximum 20 characters"],
        },
        description: {
            type: String,
            require: [true, "Description is Required"],
        },
        price: {
            type: Number,
            require: [true, "Price is Required"],
            min: [0, "Price can't be negative"],
        },
        // createAt: {
        //     date: {
        //         type: Date,
        //         default: Date.now(),
        //     },
        // },
        // updateAt: {
        //     date: {
        //         type: Date,
        //         default: Date.now(),
        //     },
        // },
        unit: {
            type: String,
            require: true,
            enum: {
                values: ["kg", "litre", "pcs"],
                message: "unit value can't be {VALUE}, must be kg/litre/pcs",
            },
        },
    },
    { timestamps: true }
);

app.get("/", (req, res) => {
    res.send("Route is working!");
});

module.exports = app;
