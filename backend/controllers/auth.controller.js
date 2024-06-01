require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { addCookie, clearCookie } = require("../utils/handleCookie.utils")
const User = require("../models/user.model")
const verifyRole = require("../middlewares/verifyRole.middleware")

const accessTokenExpire = process.env.ACCESS_TOKEN_EXPIRE
const refreshTokenExpire = process.env.REFRESH_TOKEN_EXPIRE

const signup = async (req, res) => {
    try {
        const { username, email, password, fname, lname, age, maritalstatus, role } = req.body

        // admin account can't be created from this endpoint
        if (role === 'admin') {
            return res.status(403).json({ message: "Forbidden: insufficient permission" })
        }

        // general input fields checkup
        if (!username || !email || !password || !fname) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const existingUname = await User.findOne({ username })
        if (existingUname) {
            return res.status(400).json({ message: "username already exists" })
        }
        const existingEmail = await User.findOne({ email })
        if (existingEmail) {
            return res.status(400).json({ message: "email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            fname,
            lname,
            age,
            maritalstatus,
            role: 'normal'
        })
        await newUser.save()

        const payload = { userid: newUser._id, role: 'normal' }
        const secretkey = process.env.JWT_SECRET_KEY
        if (!secretkey) {
            return res.status(500).json({ message: "Missing JWT secret key" });
        }
        const token = jwt.sign(payload, secretkey, { expiresIn: '5m' })

        res.status(201).json({ message: "user created successfully", userdetails: { username, email }, token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const login = async (req, res) => {
    try {
        const cookies = req.cookies
        const { id, password } = req.body
        if (!id || !password) {
            return res.status(400).json({ message: "Missing required fields" })
        }

        const foundUser = await User.findOne({ $or: [{ username: id }, { email: id }] })
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid login credentials" })
        }

        const isMatch = await bcrypt.compare(password, foundUser.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid login credentials" })
        }

        const payload = {
            userid: foundUser._id,
            role: foundUser.role
        }
        const accessSecretKey = process.env.JWT_SECRET_KEY
        if (!accessSecretKey) return res.status(500).json({ message: "Missing JWT secret key" });
        const accessToken = jwt.sign(payload, accessSecretKey, { expiresIn: accessTokenExpire })

        const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
        if (!refreshSecretKey) return res.status(500).json({ message: "Missing JWT refresh secret key" });
        const refreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn: refreshTokenExpire })

        const newRefreshTokens = cookies?.refreshToken ?
            foundUser.refreshTokens.filter(rt => rt != cookies.refreshToken) :
            foundUser.refreshTokens
        if (cookies?.refreshToken) {
            clearCookie(res, 'refreshToken')
        }

        foundUser.refreshTokens = [...newRefreshTokens, refreshToken]
        if (foundUser.refreshTokens.length > 5) {
            foundUser.refreshTokens.shift()
        }
        await foundUser.save()

        const userData = {
            username: foundUser.username,
            fname: foundUser.fname,
        }

        addCookie(res, "userData", JSON.stringify(userData))
        addCookie(res, "refreshToken", refreshToken)

        res.status(200).json({ message: "Login successful", accessToken, user: userData })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const logout = async (req, res) => {
    try {
        const cookies = req.cookies
        if (!cookies?.refreshToken) {
            return res.status(204).json({ message: "no jwt cookie" })
        }
        const refreshToken = req.cookies?.refreshToken

        const foundUser = await User.findOne({ refreshTokens: refreshToken })
        foundUser.refreshTokens = foundUser.refreshTokens.filter(rt => rt != refreshToken)
        await foundUser.save()

        clearCookie(res, 'refreshToken')
        clearCookie(res, 'userData')

        res.status(200).json({ message: 'logged out' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getDetails = async (req, res) => {
    try {
        const userid = req.user.userid
        if (!userid) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const foundUser = await User.findOne({ _id: userid })
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const userData = {
            username: foundUser.username,
            fname: foundUser.fname,
            lname: foundUser.lname,
            email: foundUser.email,
            age: foundUser.age,
        }

        res.status(200).json({ userData })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

// note: refreshtoken won't invalidate previous acess token. check it later
// note: if user hash not refreshed for more than accesstoken timeout use logic in frontend to refreshtoken and get a new key if refreshtoken not timed out. otherwise user will have to login again and new refreshkey will be generated
const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken
        if (!refreshToken) return res.status(401).json({ message: "no refresh token found" })

        clearCookie(res, 'refreshToken')

        const foundUser = await User.findOne({ refreshTokens: refreshToken })

        const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
        const accessSecretKey = process.env.JWT_SECRET_KEY
        // In case user already refreshed using the token (it will be removed), but someone has access to that token and reusing it
        if (!foundUser) {
            jwt.verify(
                refreshToken,
                refreshSecretKey,
                async (error, decoded) => {
                    if (error) {
                        return res.status(403).json({ message: 'Forbidden' })
                    }

                    const hackedUser = await User.findOne({ _id: decoded.userid })
                    hackedUser.refreshTokens = []
                    await hackedUser.save()
                    console.log(`Hacked user ${hackedUser.username} logged out of all devices`);
                }
            )
            return res.status(403).json({ message: 'Forbidden' })
        }

        // proceed further steps
        const newRefreshTokens = foundUser.refreshTokens.filter(rt => rt != refreshToken)

        jwt.verify(
            refreshToken,
            refreshSecretKey,
            async (error, decoded) => {
                if (error) {
                    foundUser.refreshTokens = [...newRefreshTokens]
                    await foundUser.save()

                    if (error.name === "TokenExpiredError") {
                        return res.status(403).json({ message: "Refresh token expired" });
                    } else if (error.name === "JsonWebTokenError") {
                        return res.status(403).json({ message: "Invalid refresh token" });
                    }
                    // console.log(error);
                    return res.status(403).json({ message: "Forbidden" })
                }

                // in case any user is using some other user's token
                if (foundUser._id.toString() !== decoded.userid) {
                    return res.status(403).json({ message: 'Forbidden' })
                }

                const payload = { userid: foundUser._id, role: foundUser.role }
                if (!accessSecretKey) return res.status(500).json({ message: "Missing JWT secret key" });
                const newAccessToken = jwt.sign(payload, accessSecretKey, { expiresIn: accessTokenExpire })

                if (!refreshSecretKey) return res.status(500).json({ message: "Missing JWT refresh secret key" });
                const newRefreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn: refreshTokenExpire })

                addCookie(res, "refreshToken", newRefreshToken)

                foundUser.refreshTokens = [...newRefreshTokens, newRefreshToken]
                await foundUser.save()

                const userData = {
                    username: foundUser.username,
                    fname: foundUser.fname,
                }
                res.status(200).json({ message: "access key refreshed", newAccessToken, user: userData })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = {
    signup,
    login,
    logout,
    getDetails,
    refreshToken,
}