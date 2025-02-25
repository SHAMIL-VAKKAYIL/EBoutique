import express from "express";
import { adminCheckAuth, adminLogout, adminSignin } from "../controllers/adminController.js";
import { adminProtectRoute } from "../middlewares/ProtectRoute.js";


const router = express.Router()

// router.post('/singup', adminSignup)
router.post('/signin', adminSignin )
// router.post('/logout', adminLogout)
router.get('/authCheck', adminProtectRoute, adminCheckAuth)
router.post('/logout', adminProtectRoute, adminLogout)


export default router