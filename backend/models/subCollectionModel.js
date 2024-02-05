const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCollectionSchema = new Schema({
    products: {
        type: [Product],
        required: true,
    },
    minProducts: {
        type: Number,
        required: true;
    }
}, { timestamps: true });

mongoose.model("SubCollection", subCollectionSchema);

mongoose.exports = SubCollection;