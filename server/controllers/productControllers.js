import Product from "../models/ProductSchema.js"
import Order from '../models/OrderSchema.js'
import customProd from '../models/CustomiseModel.js'
// import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import Cart from "../models/CartSchema.js"

dotenv.conifg()

export const addProduct = async (req, res) => {
    const productData = req.body
    const image = req.file.filename
    const { name, description, color, size, pattern, category, material, price, } = productData
    try {
        const product = new Product({ name, description, color, size, pattern, category, material, price, image })
        await product.save()
        res.status(201).json({ message: 'Product added successfully' })

    } catch (error) {
        console.log(error);

    }
}

export const UpdateProduct = async (req, res) => {
    const { name, description, color, size, pattern, category, material, price, } = req.body
    const { id: productId } = req.params
    console.log(productId);

    const image = req.file?.filename

    try {
        const update = {
            ...(name && { name }),
            ...(image && { image }),
            ...(description && { description }),
            ...(color && { color }),
            ...(size && { size }),
            ...(pattern && { pattern }),
            ...(category && { category }),
            ...(material && { material }),
            ...(price && { price })
        }
        const updatedProduct = await Product.findByIdAndUpdate(productId, update, { new: true })
        console.log(updatedProduct);

        res.status(200).json({ message: 'Product updated successfully' })

    } catch (error) {
        console.log(error);
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const product = await Product.find().sort({ _id: -1 })
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

export const getSinlgeProduct = async (req, res) => {
    const { id: productId } = req.params
    try {
        const product = await Product.findById(productId)
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

export const ProductByVendor = async (req, res) => {
    const vendorId = req.vendor._id
    try {
        const product = await Product.find({ vendorId })
        res.status(200).json(product)

    } catch (error) {
        console.log(error);

    }
}

// export const singleProduct = async (req, res) => {
//     const { id: productId } = req.params
//     try {
//         const product = await Product.findOne()
//     } catch (error) {
//         console.log(error);

//     }
// }
export const deleteProduct = async (req, res) => {
    const { id: productId } = req.params
    console.log(req.params);
    console.log(productId);

    try {
        const data = await Product.findByIdAndDelete(productId)
        console.log(data);

        res.status(200).json(data)
    } catch (error) {
        console.log(error);
    }
}

export const newReview = async (req, res) => {
    const { productId, comment, rating } = req.body
    const userId = req.user._id
    try {
        const product = await Product.findByIdAndUpdate(productId, { $push: { review: { userId, comment, rating } } }, { new: true })
        console.log(product);

        res.status(201).json({ message: 'Review added successfully' })

    } catch (error) {
        console.log(error);
    }
}

// export const getReview = async (req, res) => {
//     const { productId } = req.body
//     // const userId = req.user._id

//     try {
//         const product = await Product.findById(productId)
//         const reviews = product.review

//         res.status(201).json(reviews)

//     } catch (error) {
//         console.log(error);
//     }
// }
export const getReview = async (req, res) => {
    const { id: productId } = req.params
    console.log(productId);

    try {
        const product = await Product.findById(productId)
            .populate('review.userId', 'username')

        // populate user details
        // console.log(product);

        const reviews = product.review
        console.log(reviews);

        res.status(201).json(reviews)
    } catch (error) {
        console.log(error);
    }
}

export const getAllReview = async (req, res) => {
    try {
        // Populate the 'review' field first, then populate 'userId' inside each review
        const products = await Product.find().populate({
            path: "review",
            populate: {
                path: "userId",
                select: "username",
            },
        });

        // Extract all reviews from products
        const allReviews = products.flatMap((product) => product.review);

        console.log("All Reviews:", allReviews);

        res.status(200).json(allReviews);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};


export const customize = async (req, res) => {
    const formData = req.body
    console.log(req.body);


    const userId = req.user._id
    const image = req.file?.filename
    console.log(formData);

    const { color, size, pattern, material, category, priceRange, additionalDetails } = formData

    try {
        const product = new customProd({
            customer: userId,
            image,
            color,
            size,
            pattern,
            material,
            category,
            priceRange,
            additionalDetails
        })
        await product.save()
        console.log(product);

        res.status(201).json({ message: 'Product added successfully' })

    } catch (error) {
        console.log(error);

    }
}

export const getCustomizedProducts = async (req, res) => {
    try {
        const products = await customProd.find().populate('customer', 'username')
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
    }
}

export const getCustomizedProductsForVendor = async (req, res) => {
    const vendorId = req.vendor._id
    try {
        const products = await customProd.find({ vendor: vendorId }).populate('customer', 'username')
        res.status(200).json(products)
    } catch (error) {
        console.log(error);
    }
}

export const setCustomizedProductsForVendor = async (req, res) => {
    const { vendor, orderId } = req.body
    console.log(req.body);

    try {
        const product = await customProd.findByIdAndUpdate(orderId, { vendor: vendor }, { new: true })
        console.log(product);
        res.status(200).json({ message: 'Product added to vendor successfully' })
    } catch (error) {
        console.log(error);

    }
}

export const getUserCustomOrder = async (req, res) => {
    const userId = req.user._id
    try {
        const customcart = await customProd.find({ customer: userId })
        res.status(200).json(customcart)

    } catch (error) {
        console.log(error);

    }
}

export const addToCart = async (req, res) => {
    const { productId, quantity = 1 } = req.body
    const userId = req.user._id
    console.log(req.body);

    try {
        let cart = await Cart.findOne({ customer: userId });

        if (!cart) {
            cart = new Cart({
                customer: userId,
                products: [{ productId, quantity }]
            })

        } else {

            const existingProduct = cart.products.find(product => product.productId.toString() === productId)

            if (existingProduct) {
                existingProduct.quantity += quantity
            }

            else {

                cart.products.push({ productId: productId, quantity: quantity })
            }
        }
        await cart.save()
        res.status(201).json({ message: 'Product added to cart successfully' })
    } catch (error) {
        console.log(error);

    }
}

export const getCart = async (req, res) => {
    const userId = req.user._id
    try {
        const cart = await Cart.findOne({ customer: userId }).populate('products.productId')


        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
    }
}



export const removeFromCart = async (req, res) => {
    const { id: productId } = req.params
    const userId = req.user._id
    console.log(req.body);
    try {
        const cart = await Cart.findOneAndUpdate({ customer: userId }, { $pull: { products: { productId } } }, { new: true })
        console.log(cart);
        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
    }

}

export const productQuantitydecrease = async (req, res) => {
    const { id: productId } = req.params
    const userId = req.user._id
    try {
        const quantityDecrease = await Cart.findOneAndUpdate({ customer: userId, "products.productId": productId }, { $inc: { "products.$.quantity": -1 } }, { new: true })
        res.status(200).json('decreased')
    } catch (error) {
        console.log(error);

    }
}


//? filteirng

export const productByPriceRange = async (req, res) => {
    const { min, max } = req.params
    console.log(min, max);
    try {
        const product = await Product.find({ price: { $gt: min, $lt: max } })
        console.log(product);
        if (!product) return

        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

export const productByCategory = async (req, res) => {
    const { filter: category } = req.params
    console.log(category);

    try {
        const product = await Product.find({ category: category })
        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

export const productSearching = async (req, res) => {
    try {
        const { query } = req.query
        const product = await Product.find({ name: { $regex: query, $options: 'i' } })
        console.log(product);

        res.status(200).json(product)
    } catch (error) {
        console.log(error);

    }
}

// export const productByPattern = async (req, res) => {
//     const { filter: pattern } = req.params
//     try {
//         const product = await Product.find({ pattern: pattern })
//         res.status(200).json(product)
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const productByMaterial = async (req, res) => {
//     const { filter: material } = req.params
//     try {
//         const product = await Product.find({ material: material })
//         res.status(200).json(product)
//     } catch (error) {
//         console.log(error);
//     }
// }

// export const productByColor = async (req, res) => {
//     const { filter: color } = req.params
//     try {
//         const product = await Product.find({ color: color })
//         res.status(200).json(product)
//     } catch (error) {
//         console.log(error);
//     }
// }

export const productBySize = async (req, res) => {
    const { filter: size } = req.params
    console.log(size);

    try {

        const product = await Product.find({ size: { $regex: '^' + size + '$', $options: 'i' } });
        console.log(product);

        res.status(200).json(product)
    } catch (error) {
        console.log(error);
    }
}

// const razorpay = new Razorpay({
//     key_id: process.env.key_id,
//     key_secret: process.env.key_secret,

// })


//? ordering 

// export const createOrder = async (req, res) => {
//     const userId = req.user._id
//     console.log(req.body, 'body');

//     const { totalAmount, product } = req.body
//     console.log(req.body);


//     try {

//         const orderPayment = await razorpay.orders.create({
//             amount: totalAmount * 100,
//             currency: 'INR'
//         })

//         const newOrder = new Order({
//             customer: userId,
//             totalAmount,
//             razorpayid: orderPayment.id,
//             orderItems: product,
//         })
//         await newOrder.save()

//         console.log(newOrder);

//         res.status(200).json(orderPayment);
//     } catch (error) {
//         console.error(error);
//     }
// }


export const getOrders = async (req, res) => {
    const userId = req.user._id
    try {
        const orders = await Order.find({ customer: userId }).sort({ _id: -1 }).populate('orderItems.productId')
        console.log(orders);
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
    }
}

export const getAllOrders = async (req, res) => {

    try {
        const orders = await Order.find().sort({ _id: -1 }).populate('orderItems.productId')
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
    }
}


export const setOrderStatus = async (req, res) => {
    const { id: orderId, status: status } = req.params
    console.log(orderId, status);


    try {
        const setstatus = await Order.findByIdAndUpdate(orderId, { $set: { status: status } }, { new: true })
        res.status(200).json('status updated')

    } catch (error) {
        console.log(error);

    }
}

export const setcustomOrderStatus = async (req, res) => {
    const { id: orderId, status: status } = req.params

    console.log(orderId, status);

    try {
        const setstatus = await customProd.findByIdAndUpdate(orderId, { $set: { status: status } }, { new: true })
        res.status(200).json('status updated')

    } catch (error) {
        console.log(error);

    }
}