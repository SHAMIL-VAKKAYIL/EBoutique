import { model, Schema } from "mongoose";
const CustomizationSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor',
    },
    color: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
    },
    material: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: ["Casual", "Formal", "Ethnic"],
    },
    priceRange: {
        type: String,
    },
    additionalDetails: {
        type: String,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
});

const customize = model("Customization", CustomizationSchema);

export default customize;