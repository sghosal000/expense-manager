const mongoose = require("mongoose")

const blockedTokenSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true,
        unique: true
    }
})

const BlockedToken = new mongoose.model("BLockedToken", blockedTokenSchema)

const options = { discriminatorKey: '_keyType' };
const BlockedAccessToken = BlockedToken.discriminator("BlockedAscessToken", new mongoose.Schema({
    expiresAt: {
        type: Date,
        required: true,
        expires: '3h'
    }
}, options))
const BlockedRefreshToken = BlockedToken.discriminator("BlockedRefreshToken", new mongoose.Schema({
    expiresAt: {
        type: Date,
        required: true,
        expires: '7d'
    }
}, options))

module.exports = {
    BlockedToken,
    BlockedAccessToken,
    BlockedRefreshToken
}