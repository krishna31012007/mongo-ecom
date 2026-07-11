import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
   title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    embedding: {
        type: [Number],
        required: true
    }
})

export default mongoose.models.Product || mongoose.model("Product", productSchema);