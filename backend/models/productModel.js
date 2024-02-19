const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    brand: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    color: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
    hashtags: {
        type: [{
            type: String,
        }],
        required: false,
    }
    
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;