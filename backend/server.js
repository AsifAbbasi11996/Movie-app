import express from 'express'
import connectDB from './database/db.js'
import cors from 'cors'
import movieRoutes from './routes/movie.route.js'
import authRoutes from './routes/auth.route.js'
import path from 'path'

// Equivalent of __dirname in ES modules
import { fileURLToPath } from 'url'

const app = express()

// Get the current directory path
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Connect to MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/movies', movieRoutes)
app.use('/api/auth', authRoutes)

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
