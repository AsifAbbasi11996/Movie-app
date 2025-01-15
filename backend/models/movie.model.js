import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true }, // IMDb-like rating (0-10 scale)
    releaseDate: { type: Date, required: true },
    duration: { type: Number, required: true }, // Duration in minutes
    image: { type: [String], required: true }, // URL to movie poster
    genre: { type: [String], required: true }, // Array of genres (e.g., ['Action', 'Comedy'])
    director: { type: String, required: true },
    cast: { type: [String], required: true }, // Array of cast members
    language: { type: String, required: true }, // Language of the movie
    country: { type: String, required: true }, // Country where the movie was made
    trailerLink: { type: String, required: true } // URL to the movie trailer
  },
  { timestamps: true }
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
