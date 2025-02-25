import { model, Schema } from "mongoose";

const productSchema = new Schema({
    vendorId: {
        type: Schema.Types.ObjectId,
        ref: "Vendor"
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    pattern: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    review:{
        type: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            }
        }]
    }
})

const Product = model('Product', productSchema)

export default Product