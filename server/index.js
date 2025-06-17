import express from 'express';
import { DbConnect } from './lib/db.js';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import adminRouter from './routes/adminRouter.js'
import userRouter from './routes/userRouter.js'
import vendorRouter from './routes/vendorRouter.js'
import productRouter from './routes/productRouter.js'
import cors from 'cors'

configDotenv();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://216.10.242.120:5173',
    credentials: true
}))


app.use('/admin', adminRouter)
app.use('/user', userRouter)
app.use('/vendor', vendorRouter)
app.use('/product', productRouter)


app.listen(5000,'0.0.0.0', () => {
    console.log('Server is running on port 3000');
    DbConnect
});

