import express from 'express'
import {
  registerUser,
  loginUser,
  getUserDetails,
  getAllUser
} from '../controllers/auth.controller.js'
import protect from '../middleware/auth.middleware.js'

const router = express.Router()

// get all users
router.get('/all', getAllUser)

// POST - Register new user
router.post('/register', registerUser)

// POST - Login user
router.post('/login', loginUser)

// GET - Get user details (protected)
router.get('/profile', protect, getUserDetails)

export default router
