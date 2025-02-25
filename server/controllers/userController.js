import User from "../models/customerSchema.js"
import bcrypt from 'bcryptjs'
import { userToken } from "../utils/TokenGeneration.js"


export const userSignup = async (req, res) => {
    const { username, email, password } = req.body
    try {

        const exuser = await User.findOne({ email: email })
        if (exuser) {
            return res.status(400).json('Email already exists')
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(password, salt)

            const newUser = new User({ username, email, password: hashedpassword })
            await newUser.save()
            console.log(newUser);

            return res.status(201).json({ message: 'User created successfully' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Error creating user' })
    }
}

export const userSignin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
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
                userToken(user._id, res)
                res.status(200).json({
                    id: user._id,
                    username: user.username,
                    email: user.email,
                })
            }
        }
    } catch (error) {
        res.status(404).json({ message: "internalError" })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password')
        console.log(users, 'user');

        res.status(200).json(users)
    } catch (error) {
        console.log(error);
    }
}

export const userProfileUpdate = async (req, res) => {
    const { username, email, phone, address } = req.body
    const userId = req.user._id
    try {
        if (!username && !email) {
            return res.status(400).json('No data provided')
        }
        const update = {}

        if (username) update.username = username
        if (email) update.email = email
        if (phone) update.phone = phone
        if (address) update.address = address

        const user = await User.findByIdAndUpdate(userId, update, { new: true })
        if (!user) {
            return res.status(404).json('User not found')
        }
        else {
            res.status(200).json(user)
        }

    } catch (error) {
        console.log(error);

    }
}

export const userCheckAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log('error in checkAuth', error);
        res.status(500).json({ message: 'internal server error' })

    }
}

export const userLogout = async (req, res) => {
    try {
        res.cookie("BoutiUser", "", { maxAge: 0 })
        res.json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(404).json({ message: 'internal error' })
    }
}
