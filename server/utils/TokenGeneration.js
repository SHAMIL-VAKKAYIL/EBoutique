import jwt from "jsonwebtoken"
export const userToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    res.cookie('BoutiUser', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: 'strict',
    })
    return token
}

export const adminToken = (adminId, res) => {
    const token = jwt.sign({ adminId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    res.cookie('BoutiAdmin', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: 'strict',
    })
    return token
}

export const vendorToken = (vendorId, res) => {
    const token = jwt.sign({ vendorId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    res.cookie('BoutiVendor', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: false,
        sameSite: 'strict',
    })
    return token
}