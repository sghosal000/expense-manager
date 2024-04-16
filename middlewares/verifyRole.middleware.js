const jwt = require("jsonwebtoken")
require('dotenv').config()

const verifyRole = (role) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token){
        return res.status(401).json({ message: "Unauthorized" })
    }

    if (!process.env.JWT_SECRET_KEY) {
        return res.status(500).json({ message: "Missing JWT secret key in environment variables" });
    }
    if (!process.env.JWT_SECRET_KEY_ADMIN) {
        return res.status(500).json({ message: "Missing JWT admin secret key in environment variables" });
    }

    try {
        const decoded = jwt.verify(token, role === 'admin'? process.env.jWT_SECRET_KEY_ADMIN: process.env.jWT_SECRET_KEY)
        if(decoded.role !== role){
            return res.status(403).json({ message: "Forbidden: insufficient permission" })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" })
    }
    next()
}

module.exports = { verifyRole }