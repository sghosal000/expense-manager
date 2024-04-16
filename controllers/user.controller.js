const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/user.model")

const signup = async (req, res) => {
    try {
        const { username, email, password, fname, lname, age, maritalstatus } = req.body()

        if (!username || !email || !password) {
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

        const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_ROUNDS)

        const newUser = new user({
            username,
            email,
            password: hashedPassword,
            fname,
            lname,
            age,
            maritalstatus
        })
        await newUser.save()

        const payload = { userid: newUser._id }
        const secretkey = process.env.JWT_SECRET_KEY
        if (!secretkey) {
            return res.status(500).json({ message: "Missing JWT secret key in environment variables" });
        }
        const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })

        res.status(201).json({ message: "user created successfully", userdetails: { username, email }, token })
    } catch (error) {
        res.status(500).json({ error: error, message: "Internal server error" })
    }
}

module.exports = {
    signup
}