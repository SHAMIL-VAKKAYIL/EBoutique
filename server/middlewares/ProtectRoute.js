import jwt from 'jsonwebtoken'
import User from '../models/CustomerSchema.js'
import Admin from '../models/AdminSchema.js'
import Vendor from '../models/VendorSchema.js'

export const userProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.BoutiUser
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, "dgnvjdkfhg")

        if (!decoded) {
            return res.status(401).json({ msg: "Token verification failed" })
        }

        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({ msg: "User not found" })
        }
        req.user = user
        next()

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Server error" })

    }
}

export const adminProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.BoutiAdmin
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }

        const decoded = jwt.verify(token, 'dgnvjdkfhg')

        if (!decoded) {
            return res.status(401).json({ msg: "Token verification failed" })
        }

        const user = await Admin.findById(decoded.adminId).select("-password")
        if (!user) {
            return res.status(401).json({ msg: "User not found" })
        }
        req.admin = user
        next()

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Server error" })

    }
}

export const vendorProtectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.BoutiVendor
        if (!token) {
            return res.status(401).json({ msg: "No token, authorization denied" })
        }
        const decoded = jwt.verify(token, 'dgnvjdkfhg')

        if (!decoded) {
            return res.status(401).json({ msg: "Token verification failed" })
        }

        const user = await Vendor.findById(decoded.vendorId).select("-password")
        if (!user) {
            return res.status(401).json({ msg: "User not found" })
        }
        req.vendor = user
        next()

    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Server error" })

    }
}

export const combineProtectRoute = async (req, res, next) => {
    try {
      // Check for vendor token
      const vendorToken = req.cookies.BoutiVendor;
      if (vendorToken) {
        try {
          const decoded = jwt.verify(vendorToken, 'dgnvjdkfhg');
          const vendor = await Vendor.findById(decoded.vendorId).select("-password");
          if (vendor) {
            req.vendor = vendorToken;
            return next();
          }
        } catch (error) {
            console.log(error);
            
        }
      }
      
      // Check for admin token
      const adminToken = req.cookies.BoutiAdmin;
      if (adminToken) {
        try {
          const decoded = jwt.verify(adminToken, 'dgnvjdkfhg');
          const admin = await Admin.findById(decoded.adminId).select("-password");
          if (admin) {
            req.admin = admin;
            return next();
          }
        } catch (error) {
            console.log(error);   
        }
      }
      
      return res.status(401).json("Not authorized " );
      
    } catch (error) {
      console.error(error);
      res.status(500).json( "Server error" );
    }
  };