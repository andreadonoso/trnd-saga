// Libraries
const express = require("express");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product")

// Connect to MongoDB
const uri = process.env.URI;
mongoose.connect(uri)
    .then((result) => app.listen(process.env.PORT))
    .catch((err) => console.log(err))

// Initialize Express app & Middleware
const app = express();
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
}) 

// Routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app!!!'})
});

// Listen for requests
// app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
// app.listen(4000, () => console.log("Listening on port 4000"));