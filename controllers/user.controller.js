require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const user = require("../models/user.model")
const verifyRole = require("../middlewares/verifyRole.middleware")

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
        const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })
        
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
        const secretkey = foundUser.role === 'admin'? process.env.JWT_SECRET_KEY_ADMIN: process.env.JWT_SECRET_KEY
        if (!secretkey) {
            return res.status(500).json({ message: "Missing JWT secret key in environment variables" });
        }
        const token = jwt.sign(payload, secretkey, { expiresIn: '1h' })

        res.status(200).json({ message: "Login successful", token })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getAllUsers = async (req, res) => {
    try {
      verifyRole('admin')(req, res, async () => {
        const users = await user.find().select('-password')
        res.status(200).json({ users });
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  

module.exports = {
    signup,
    login,
    getAllUsers
}