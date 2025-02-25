import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: '',
    },
    address: {
        type: String,
        default: '',

    }
})

const User = model('User', userSchema)

export default User;