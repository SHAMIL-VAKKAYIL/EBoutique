import express from "express";
import { getAllVendor, vendorCheckAuth, vendorCreation, vendorLogout, vendorSignin } from "../controllers/vendorControllers.js";
import { adminProtectRoute, vendorProtectRoute } from "../middlewares/ProtectRoute.js";


const router = express.Router()

router.post('/newVendor', vendorCreation)
router.post('/signin', vendorSignin)
router.get('/authCheck', vendorProtectRoute, vendorCheckAuth)
router.post('/logout', vendorProtectRoute, vendorLogout)
router.get('/getAllVendor', adminProtectRoute, getAllVendor)

export default router