const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    // color: {
    //     type: String,
    //     required: true,
    // },
    // image: {
    //     type: image,
    //     required: true,
    // },
    // url: {
    //     type: String,
    //     required: false,
    // },
    // hashtags: {
    //     type: [String],
    //     required: false,
    // }
    
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;