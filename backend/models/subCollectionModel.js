const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCollectionSchema = new Schema({
    parentCollection: {
        type: Schema.Types.ObjectId,
        ref: "Collection",
        required: true
    },
    products: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Product"
        }],
        required: true,
    },
    max: {
        type: Number,
        default: 10,
        required: false;
    }
}, { timestamps: true });

mongoose.model("SubCollection", subCollectionSchema);

mongoose.exports = SubCollection;