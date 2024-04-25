const { BlockedToken } = require("../models/blockedToken.model")

const isBlacklisted = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]

        if(!token){
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const blockedToken = await BlockedToken.findOne({ tokenId: token })
        if (blockedToken) {
            return res.status(401).json({ message: 'Token is blacklisted' })
        }

        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' })
    }
};

module.exports = { isBlacklisted }
