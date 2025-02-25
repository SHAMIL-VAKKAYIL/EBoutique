import { model, Schema } from "mongoose";


const orderItems = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [orderItems],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    currency: {
        type: String,
        required: true,
        default: 'INR'
    },
    razorpayid: {
        type: String,
        required: true
    },

})
const Order = model('order', OrderSchema)
export default Order;