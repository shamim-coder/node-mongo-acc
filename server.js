const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");
const dbConnect = require("./utils/dbConnect");

// database connection
dbConnect();

// server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`.yellow.bold);
});
