import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

export const DbConnect = mongoose.connect('mongodb://admin:pass123@mongodb:27017/EBoutique?authSource=admin').then(() => {
    console.log('Connected to MongoDB')
}).catch(err => console.error(err))
