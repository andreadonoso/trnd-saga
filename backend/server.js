// Libraries and Declarations
const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const collectionRoutes = require("./routes/collectionRoutes");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const URI = process.env.URI;
const PORT = process.env.PORT || 4000;

// Initialize Express App & Middleware
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
	console.log(req.path, req.method);
	next();
});

// Heroku deployment
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend", "build")));
	app.get("*", (req, res) => {
		res.sendFile(
			path.join(__dirname, "../frontend", "build", "index.html")
		);
	});
} else {
	app.get("/", (req, res) => res.send("Please set to production"));
}

// Connect to MongoDB
mongoose
	.connect(URI)
	.then((result) => {
		app.listen(PORT);
		console.log("Connected to DB");
		console.log(`Listening on port ${PORT}`);
	})
	.catch((err) => console.log(err));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/products", productRoutes);
