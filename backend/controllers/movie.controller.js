import Movie from '../models/movie.model.js'

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find()
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

//get movie by id
export const getMovieById = async (req, res) => {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }
    res.status(200).json(movie)
  } catch (error) {
    console.error('Error fetching item:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getSortedMovies = async (req, res) => {
  const { sortBy } = req.query
  const sortCriteria = {
    name: 'title',
    rating: 'rating',
    releaseDate: 'releaseDate',
    duration: 'duration'
  }

  try {
    const movies = await Movie.find().sort(sortCriteria[sortBy] || 'title') // Default to 'title' if sortBy is invalid
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Search movies by name or description
export const searchMovies = async (req, res) => {
  const { query } = req.query
  if (!query) {
    return res.status(400).json({ message: 'Search query is required.' })
  }

  try {
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    })
    res.json(movies)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Add a new movie (Admin only)
export const addMovie = async (req, res) => {
  const {
    title,
    description,
    rating,
    releaseDate,
    duration,
    genre,
    director,
    cast,
    language,
    country,
    trailerLink
  } = req.body

  // Handle image file upload
  const images = req.files
    ? req.files.map(file => `/uploads/movies/${file.filename}`)
    : [] // Array of image file paths after upload

  try {
    const newMovie = new Movie({
      title,
      description,
      rating,
      releaseDate,
      duration,
      image: images, // Save the array of image URLs
      genre,
      director,
      cast,
      language,
      country,
      trailerLink
    })

    const savedMovie = await newMovie.save()
    res.status(201).json(savedMovie) // Send saved movie data as response
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Update a movie (Admin only)
export const updateMovie = async (req, res) => {
  const { id } = req.params
  const {
    title,
    description,
    rating,
    releaseDate,
    duration,
    genre,
    director,
    cast,
    language,
    country,
    trailerLink
  } = req.body

  // Handle the image update
  let images = req.files
    ? req.files.map(file => `/uploads/movies/${file.filename}`)
    : [] // Array of new image paths if new images are uploaded

  try {
    // Find the movie by ID and update it
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    // If no new images are provided, keep the existing images
    if (req.files.length === 0) {
      images = movie.image
    }

    // Update movie with the provided data
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rating,
        releaseDate,
        duration,
        image: images, // Update the image field with the new array of image URLs
        genre,
        director,
        cast,
        language,
        country,
        trailerLink
      },
      { new: true } // Return the updated movie
    )

    res.json(updatedMovie) // Send the updated movie data as response
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

// Delete a movie (Admin only)
export const deleteMovie = async (req, res) => {
  const { id } = req.params

  try {
    await Movie.findByIdAndDelete(id)
    res.json({ message: 'Movie deleted successfully' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
