const jwt = require("jsonwebtoken")
require('dotenv').config()

const { isBlacklisted } = require("../utils/blockToken.utils")

const getUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if(!token){
            return res.status(401).json({ message: 'Unauthorized' })
        }

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({ message: "Missing JWT secret key" });
        }

        // isBlacklisted(token)

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { userid: decoded.userid }

        next()
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "token expired" })
        }
        return res.status(401).json({ message: "unauthorized" }) 
    }
}

module.exports = getUser