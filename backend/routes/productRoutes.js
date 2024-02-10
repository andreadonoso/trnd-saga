const express = require("express");
const router = express.Router();
const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Get all products
router.get('/', getProducts);

// Get a single product
router.get('/:id', getProduct);

// Create a product
router.get('/', createProduct);

// Update a product
router.get('/:id', updateProduct);

// Delete a product
router.get('/:id', deleteProduct);

module.exports = router;