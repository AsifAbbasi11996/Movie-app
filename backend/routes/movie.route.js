import express from 'express'
import {
  getMovies,
  getSortedMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
  getMovieById
} from '../controllers/movie.controller.js'
import protect from '../middleware/auth.middleware.js'
import { isAdmin } from '../middleware/role.middleware.js'
import upload from '../middleware/multer.js' // Import the updated upload middleware

const router = express.Router()

// GET - Retrieve all movies
router.get('/', getMovies)

// GET - Retrieve movie by ID
router.get('/get/:id', getMovieById)

// GET - Retrieve sorted movies
router.get('/sorted', getSortedMovies)

// GET - Search movies by name or description
router.get('/search', searchMovies)

// POST - Add a new movie (Admin only) with image upload
router.post('/add', protect, isAdmin, upload, addMovie) // Using `upload` middleware before `addMovie`

// PUT - Update a movie (Admin only) with image upload
router.put('/update/:id', protect, isAdmin, upload, updateMovie) // Using `upload` middleware before `updateMovie`

// DELETE - Delete a movie (Admin only)
router.delete('/delete/:id', protect, isAdmin, deleteMovie)

export default router
