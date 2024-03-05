const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
	getCollections,
	getCollection,
	createCollection,
	updateCollection,
	deleteCollection,
} = require("../controllers/collectionController");

// Get all collections
router.get("/", protect, getCollections);

// Get a single collection
router.get("/:id", protect, getCollection);

// Create a collection
router.post("/", protect, createCollection);

// Update a collection
router.patch("/:id", protect, updateCollection);

// Delete a collection
router.delete("/:id", protect, deleteCollection);

module.exports = router;
