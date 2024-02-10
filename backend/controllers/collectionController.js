const Collection = require("../models/collectionModel");
const User = require("../models/userModel");
const Product = require("../models/userModel");
const mongoose = require("mongoose");

// Get all collections
const getCollections = async (req, res) => {
    const collections = await Collection.find({}).sort({ createdAt: -1 });
    res.status(200).json(collections);
};

// Get a single collection
const getCollection = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error: "The collection does not exist."})
    }

    const collection = await Collection.findById(id);

    if(!collection)
    {
        return res.status(404).json({error: "The collection does not exist."})
    }

    res.status(200).json(collection);
};

// Create a collection
const createCollection = async (req, res) => {
    const {
        owner,
        description,
        likes,
        watchers,
        comments,
        banner,
        subCollections,
        maxSubCollections,
        products,
        maxProducts,
    } = req.body;

    if(!mongoose.Types.ObjectId.isValid(owner)) {
        return res.status(404).json({error: "The user does not exist."})
    }

    try {

        const collection = await Collection.create({
            owner, 
            description,
            likes,
            watchers,
            comments,
            banner,
            subCollections,
            maxSubCollections,
            products,
            maxProducts,
        });

        const user = await User.findOneAndUpdate(
            {_id: owner},
            { $push: { privateCollections: collection._id } }, 
            { new: true }
        )
    
        if(!user) {
            return res.status(404).json({error: "The user does not exist."})
        }

        res.status(200).json(collection);
    } catch(error)
    {
        res.status(400).json({error: error.message})
    }
};

// Update a collection
const updateCollection = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "The collection does not exist."});
    }

    const collection = await Collection.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!collection) {
        return res.status(404).json({error: "The collection does not exist."})
    }

    res.status(200).json(collection)
};

// Delete a collection
const deleteCollection = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({error: "The collection does not exist!"})
    }

    const collection = await Collection.findOneAndDelete({_id: id})

    if(!collection)
    {
        res.status(404).json({error: "The collection does not exist."})
    }

    const user = await User.findOneAndUpdate(
        {_id: collection.owner},
        { $pull: { privateCollections: id } }, 
    )

    if(!user) {
        return res.status(404).json({error: "The user does not exist."})
    }

    res.status(200).json(collection);
};

module.exports = {
    getCollections,
    getCollection,
    createCollection,
    updateCollection,
    deleteCollection
};

