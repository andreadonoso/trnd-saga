const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    owner: {
        type: User,
        required: true,
    },
    likes: {
        type: Number,
        required: true;
    },
    watchers: {
        type: Number,
        required: true;
    },
    // comments: {
    //     type: [String],
    //     required: true;
    // },
    // banner: {
    //     type: image,
    //     required: false;
    // },
    description: {
        type: String,
        required: false;
    },
    maxProducts: {
        type: Number,
        required: true;
    },
    // subCollections: {
    //     type: [subCollection],
    //     required: true;
    // },
    // products: {
    //     type: [Product],
    //     required: true;
    // },
}, { timestamps: true });

mongoose.model("Collection", collectionSchema);

mongoose.exports = Collection;