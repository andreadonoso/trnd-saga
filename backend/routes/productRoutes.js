const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Get all products
router.get('/', protect, getProducts);

// Get a single product
router.get('/:id', protect, getProduct);

// Create a product
router.post('/', protect, createProduct);

// Update a product
router.patch('/:id', protect, updateProduct);

// Delete a product
router.delete('/:id', protect, deleteProduct);

module.exports = router;