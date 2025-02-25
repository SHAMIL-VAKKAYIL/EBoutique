import mongoose from "mongoose";

export const DbConnect = mongoose.connect('mongodb://localhost:27017/EBoutique').then(() => {
    console.log('Connected to MongoDB')
}).catch(err => console.error(err))