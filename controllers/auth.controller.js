require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/user.model")
const verifyRole = require("../middlewares/verifyRole.middleware")

const accessTokenExpire = '5m'
const refreshTokenExpire = '7d'

const signup = async (req, res) => {
    try {
        const { username, email, password, fname, lname, age, maritalstatus, role } = req.body

        // admin account can't be created from this endpoint
        if(role === 'admin'){
            return res.status(403).json({ message: "Forbidden: insufficient permission" })
        }

        // general input fields checkup
        if (!username || !email || !password || !fname) {
            return res.status(400).json({ message: "Missing required fields" })
        }
        
        const existingUname = await user.findOne({ username })
        if (existingUname) {
            return res.status(400).jsom({ message: "username already exists" })
        }
        const existingEmail = await user.findOne({ email })
        if (existingEmail) {
            return res.status(400).jsom({ message: "email already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS))

        const newUser = new user({
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
            return res.status(500).json({ message: "Missing JWT secret key in environment variables" });
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
        const { id, password } = req.body
        if(!id || !password){
            return res.status(400).json({ message: "Missing required fields" })
        }

        const foundUser = await user.findOne({$or: [{username: id}, {email: id}]})
        if(!foundUser){
            return res.status(401).json({ message: "Invalid login credentials" })
        }
        
        const isMatch = await bcrypt.compare(password, foundUser.password)
        if(!isMatch){
            return res.status(401).json({ message: "Invalid login credentials" })
        }

        const payload = { userid: foundUser._id, role: foundUser.role }
        const accessSecretKey = foundUser.role === 'admin'? process.env.JWT_SECRET_KEY_ADMIN: process.env.JWT_SECRET_KEY
        if (!accessSecretKey) return res.status(500).json({ message: "Missing JWT secret key in environment" });
        const accessToken = jwt.sign(payload, accessSecretKey, { expiresIn: accessTokenExpire })
        
        const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
        if (!refreshSecretKey) return res.status(500).json({ message: "Missing JWT refresh secret key in environment" });
        const refreshToken = jwt.sign(payload, refreshSecretKey, { expiresIn: refreshTokenExpire })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // make this true for https only site access in deployment
            sameSite: "strict" 
        })

        res.status(200).json({ message: "Login successful", accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

// note: refreshtoken won't invalidate previous acess token. check it later
const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) return res.status(401).json({ message: "no refresh token found" })
        
        const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY
        jwt.verify(refreshToken, refreshSecretKey, async (error, decoded) => {
            if (error) {
                if (error.name === "TokenExpiredError") {
                    return res.status(401).json({ message: "Refresh token expired" });
                } else if (error.name === "JsonWebTokenError") {
                    return res.status(403).json({ message: "Invalid refresh token" });
                }
                console.log(error);
                return res.status(403).json({ message: "Forbidden" })
            }
            
            const foundUser = await user.findById(decoded.userid)
            if (!foundUser) {
                return res.status(401).json({ message: "Invalid refresh token, user not found" });
            }

            const payload = { userid: foundUser._id, role: foundUser.role }
            const accessSecretKey = foundUser.role === 'admin'? process.env.JWT_SECRET_KEY_ADMIN: process.env.JWT_SECRET_KEY
            if (!accessSecretKey) return res.status(500).json({ message: "Missing JWT secret key in environment" });
            const newAccessToken = jwt.sign(payload, accessSecretKey, { expiresIn: accessTokenExpire })

            res.status(200).json({ message: "access key refreshed", newAccessToken })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    signup,
    login,
    refreshToken,
}