// Libraries and Declarations
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const userRoutes = require("./routes/userRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const productRoutes = require("./routes/productRoutes");

const URI = process.env.URI;
const PORT = process.env.PORT

// Connect to MongoDB
mongoose.connect(URI)
    .then((result) => {
        app.listen(PORT)
        console.log("Connected to DB")
        console.log(`Listening on port ${ PORT }`)
    })
    .catch((err) => console.log(err))

// Initialize Express App & Middleware
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/products", productRoutes);
