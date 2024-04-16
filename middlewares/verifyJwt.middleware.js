const jwt = require("jsonwebtoken")
require('dotenv').config()

const verifyJwt = (optional = true) => (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token && !optional){
        return res.status(401).json({ message: 'Unauthorized: Missing JWT token' })
    }

    try {
        
    } catch (error) {
        
    }
}