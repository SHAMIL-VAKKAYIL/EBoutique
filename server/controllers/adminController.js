import Admin from "../models/AdminSchema.js"
import { adminToken } from "../utils/TokenGeneration.js"
import bcrypt from 'bcryptjs'


// export const adminSignup = async (req, res) => {
//     const email = 'john@gmail.com';
//     const password = '12345'
//     try {


//         const salt = await bcrypt.genSalt(10)
//         console.log(email);
//         console.log(salt);

//         const hashedpassword = await bcrypt.hash(password, salt)


//         const newUser = new Admin({ email, password: hashedpassword })
//         await newUser.save()
//         return res.status(201).json({ message: 'User created successfully' });


//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user' })
//     }
// }

export const adminSignin = async (req, res) => {

    const { email, password } = req.body


    try {
        const user = await Admin.findOne({ email: email })
        console.log(user);
        if (!user) {
            return res.status(400).json('invalid credentials')
        }
        
        else {
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            console.log(isPasswordCorrect);

            if (!isPasswordCorrect) {
                return res.status(400).json('invalid credentials')
            }
            else {
                adminToken(user._id, res)
                res.status(200).json(user._id)
            }
        }
    } catch (error) {
        res.status(404).json({ message: "internalError" })
    }
}
export const adminCheckAuth = async (req, res) => {
    try {
        res.status(200).json(req.admin)
    } catch (error) {
        console.log('error in checkAuth', error);
        res.status(500).json({ message: 'internal server error' })

    }
}

export const adminLogout = async (req, res) => {
    try {
        res.cookie("BoutiAdmin", "", { maxAge: 0 })
        res.json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(404).json({ message: 'internal error' })
    }
}