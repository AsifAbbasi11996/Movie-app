import jwt from 'jsonwebtoken'
import User from '../models/auth.model.js'

const protect = async (req, res, next) => {
  let token

  // Check the Authorization header for the token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1] // Get the token from the Bearer scheme
  }

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user to request object
    req.user = await User.findById(decoded.userId).select('-password')

    next() // Continue to next middleware
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' })
  }
}

export default protect
