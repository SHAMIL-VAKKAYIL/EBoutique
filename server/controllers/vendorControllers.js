import Vendors from "../models/VendorSchema.js"
import { vendorToken } from "../utils/TokenGeneration.js"
import bcrypt from "bcryptjs"


//? only admin can create vendor
export const vendorCreation = async (req, res) => {
    const { vendor } = req.body
    const { name, email, password } = vendor


    try {

        const exVendor = await Vendors.findOne({ email: email })

        if (exVendor) {
            return res.status(400).json('vendor already exists')
        }

        console.log(name, email, password);
        // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10)
        console.log(salt);
        const hashedpassword = await bcrypt.hash(password, salt)
        console.log(hashedpassword);

        const newVendor = new Vendors({ name, email, password: hashedpassword })
        await newVendor.save()
        console.log(newVendor);
        return res.status(201).json({ message: 'Vendor created successfully' });


    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'Error creating Vendor' })
    }
}


export const vendorSignin = async (req, res) => {
    const { email, password } = req.body
    try {
        const vendor = await Vendors.findOne({ email: email })
        if (!vendor) {
            return res.status(400).json('invalid credentials')
        }
        else {
            const isPasswordCorrect = await bcrypt.compare(password, vendor.password)

            if (!isPasswordCorrect) {
                return res.status(400).json('invalid credentials')
            }
            else {
                vendorToken(vendor._id, res)
                res.status(200).json(vendor)
            }
        }
    } catch (error) {
        res.status(404).json({ message: "internalError" })
    }
}

export const vendorCheckAuth = async (req, res) => {
    try {
        res.status(200).json(req.vendor)
    } catch (error) {
        console.log('error in checkAuth', error);
        res.status(500).json({ message: 'internal server error' })
    }
}

export const getAllVendor = async (req, res) => {
    try {
        const vendors = await Vendors.find()
        console.log(vendors);

        res.json(vendors)
    } catch (error) {
        res.status(404).json({ message: 'internal error' })
    }
}

export const vendorLogout = async (req, res) => {
    try {
        res.cookie("BoutiVendor", "", { maxAge: 0 })
        res.json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(404).json({ message: 'internal error' })
    }
}