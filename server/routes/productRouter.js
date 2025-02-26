import express from "express";
import { adminProtectRoute, combineProtectRoute, userProtectRoute, vendorProtectRoute } from "../middlewares/ProtectRoute.js";
import { addProduct, addToCart, createOrder, customize, deleteProduct, getAllOrders, getAllProduct, getAllReview, getCart, getCustomizedProducts, getCustomizedProductsForVendor, getOrders, getReview, getSinlgeProduct, getUserCustomOrder, newReview, productByCategory, productByPriceRange, productBySize, ProductByVendor, productQuantitydecrease, productSearching, removeFromCart, setCustomizedProductsForVendor, setcustomOrderStatus, setOrderStatus, UpdateProduct } from "../controllers/productControllers.js";
import upload from "../utils/Multer.js";


const router = express.Router()

router.post('/addProduct', combineProtectRoute, upload.single('image'), addProduct)
router.put('/manageProduct/:id', combineProtectRoute, upload.single('image'), UpdateProduct)
router.delete('/deleteProduct/:id', adminProtectRoute, deleteProduct)
router.get('/vendorProduct', vendorProtectRoute, ProductByVendor)

router.get('/category/:filter', userProtectRoute, productByCategory)
router.get('/size/:filter', userProtectRoute, productBySize)
router.get('/priceRage/:min/:max', userProtectRoute, productByPriceRange)
// router.get('/pattern/:filter', userProtectRoute, productByPattern)
// router.get('/material/:filter', userProtectRoute, productByMaterial)
// router.get('/color/:filter', userProtectRoute, productByColor)

router.get('/getAllProduct', getAllProduct)
router.get('/getSinlgeProduct/:id', getSinlgeProduct)

router.get('/search', productSearching)

router.post('/createOrder', userProtectRoute, createOrder)
router.get('/getOrders', userProtectRoute, getOrders)
router.get('/getAllorders', adminProtectRoute, getAllOrders)
router.put('/setStatus/:id/:status', adminProtectRoute, setOrderStatus)
router.put('/setcustomStatus/:id/:status', vendorProtectRoute, setcustomOrderStatus)

router.post('/newReview', userProtectRoute, newReview)
router.get('/getReview/:id', getReview)
router.get('/getAllreview', adminProtectRoute, getAllReview)

router.post('/addToCart', userProtectRoute, addToCart)
router.get('/getCart', userProtectRoute, getCart)
router.put('/delete/:id', userProtectRoute, removeFromCart)
router.put('/decrease/:id', userProtectRoute, productQuantitydecrease)

router.post('/customized', userProtectRoute, upload.single('image'), customize)
router.get('/getAllCustomiseProduct', adminProtectRoute, getCustomizedProducts)
router.get('/vendorcustomized', vendorProtectRoute, getCustomizedProductsForVendor)
router.post('/setvendor', adminProtectRoute, setCustomizedProductsForVendor)
router.put('/setcustomStatus', combineProtectRoute, setcustomOrderStatus)
router.get('/getUserCustomOrder', userProtectRoute, getUserCustomOrder)

export default router