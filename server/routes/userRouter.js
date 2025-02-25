import express from "express";
import { getAllUsers, userCheckAuth, userLogout, userProfileUpdate, userSignin, userSignup } from "../controllers/userController.js";
import { adminProtectRoute, userProtectRoute } from "../middlewares/ProtectRoute.js";


const router = express.Router()

router.post('/signup', userSignup)
router.post('/signin', userSignin)
router.put('/updateProfile', userProtectRoute, userProfileUpdate)
router.get('/allUsers',adminProtectRoute,getAllUsers)
router.get('/authCheck', userProtectRoute, userCheckAuth)
router.post('/logout', userProtectRoute, userLogout)

export default router