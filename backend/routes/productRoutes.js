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
router.post('/', createProduct);

// Update a product
router.patch('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;