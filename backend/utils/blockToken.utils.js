const { BlockedAccessToken, BlockedRefreshToken } = require("../models/blockedToken.model");

const blockAccessToken = async (tokenId) => {
    try {
        const blockedToken = new BlockedAccessToken({ tokenId });
        await blockedToken.save();
        console.log(`Access token with ID "${tokenId}" blocked successfully.`);
    } catch (error) {
        console.error("Error blocking access token:", error.message);
    }
}

const blockRefreshToken = async (tokenId) => {
    try {
        const blockedToken = new BlockedRefreshToken({ tokenId });
        await blockedToken.save();
        console.log(`Refresh token with ID "${tokenId}" blocked successfully.`);
    } catch (error) {
        console.error("Error blocking refresh token:", error.message);
    }
}

const isBlacklisted = async (token) => {
    try {
        const blockedToken = await BlockedToken.findOne({ tokenId: token })
        if (blockedToken) {
            return new Error("tokenBlockedError")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
        if(error.name === "tokenBlockedError") throw (error)
    }
}

module.exports = {
    blockAccessToken,
    blockRefreshToken,
    isBlacklisted
}
