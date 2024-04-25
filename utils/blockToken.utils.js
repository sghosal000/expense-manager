const { BlockedAccessToken, BlockedRefreshToken } = require("../models/blockedToken.model");

async function blockAccessToken(tokenId) {
    try {
        const blockedToken = new BlockedAccessToken({ tokenId });
        await blockedToken.save();
        console.log(`Access token with ID "${tokenId}" blocked successfully.`);
    } catch (error) {
        console.error("Error blocking access token:", error.message);
    }
}

async function blockRefreshToken(tokenId) {
    try {
        const blockedToken = new BlockedRefreshToken({ tokenId });
        await blockedToken.save();
        console.log(`Refresh token with ID "${tokenId}" blocked successfully.`);
    } catch (error) {
        console.error("Error blocking refresh token:", error.message);
    }
}

module.exports = { blockAccessToken, blockRefreshToken };
