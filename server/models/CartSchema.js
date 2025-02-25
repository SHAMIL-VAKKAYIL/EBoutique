import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: {
        type: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true,
            }
        }]
    },
})

const Cart = model('Cart', cartSchema)

export default Cart;