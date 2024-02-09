const express = require("express");
const router = express.Router();
const { 
    getCollections,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection
} = require("../controllers/collectionController");

// Get all collections
router.get('/', getCollections);

// Get a single collection
router.get('/:id', getCollection);

// Create a collection
router.post('/', createCollection);

// Update a collection
router.patch('/:id', updateCollection);

// Delete a collection
router.delete('/:id', deleteCollection);

module.exports = router;