const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    owner: {
        
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    description: {
        type: String,
        required: false
    },
    likes: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        default: [],
        required: false
    },
    watchers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        default: [],
        required: false
    },
    comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],
        default: [],
        required: false
    },
    banner: {
        type: String,
        required: false
    },
    subCollections: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "SubCollection"
        }],
        required: false
    },
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        default: [],
        required: false
    },
}, { timestamps: true });

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;