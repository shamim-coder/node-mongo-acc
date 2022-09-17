const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/acc-inventories").then(() => {
        console.log(`database connection is successful`.bgGreen.black.bold);
    });
};
module.exports = dbConnect;
