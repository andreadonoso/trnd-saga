const mongoose = require("mongoose");
const Product = require("../models/productModel");

// Get all products
const getProducts = async (req, res) => {
    const products = await Product.find({}).sort({createdAt: -1})
    res.status(200).json(products);
}

// Get a single product
const getProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: "The product does not exist."});
    }

    const product = await Product.findById(id);

    if(!product)
    {
        return res.status(404).json({error: "The product does not exist."});
    }

    res.status(200).json(product);
}

// Create a product
const createProduct = async (req, res) => {
    const {
        name,
        brand,
        price,
        color,
        image,
        url,
        hashtags
    } = req.body;

    try {
        const product = await Product.create({
            name,
            brand,
            price,
            color,
            image,
            url,
            hashtags
        });
        
        res.status(200).json(product);
    } catch {
        return res.status(400).json({error: error.message});
    }

}

// Update a product
const updateProduct = async (req,res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: "The product does not exist."});
    }

    const product = await Collection.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!product)
    {
        return res.status(404).json({error: "The product does not exist."});
    }

    res.status(200).json(product)
}

// Delete a product
const deleteProduct = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: "The product does not exist."});
    }

    const product = await Product.findOneAndDelete(id);

    if(!product) {
        return res.status(404).json({error: "The product does not exist."});
    }

    res.status(200).json(product);
}

module.export = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}