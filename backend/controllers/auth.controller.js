import User from '../models/auth.model.js' // Assuming you have a User model
import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'

//get all user
export const getAllUser = async (req, res) => {
  try {
    const user = await User.find()
    res.status(200).json(user)
  } catch (error) {
    console.error('Error fetching getting users', error)
    res.status(500).json({ message: 'Internal Server error' })
  }
}

// Register new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Create new user
    const newUser = new User({ username, email, password })
    await newUser.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Find user by email
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    // Create JWT token
    const token = jwt.encode({ userId: user._id }, process.env.JWT_SECRET)
    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Get user details (protected route)
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
