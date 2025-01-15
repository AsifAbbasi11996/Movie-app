import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Grid,
  Box,
  Button,
  Chip
} from '@mui/material'
import { useParams } from 'react-router-dom'
import formatImageUrl from '../utils/formatImageUrl.js'

const MovieDetail = () => {
  const { movieId } = useParams() // Get movieId from URL parameters
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch the movie detail by ID
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `https://movie-app-backend-production-21f6.up.railway.app/api/movies/get/${movieId}`
        )
        setMovie(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching movie details', err)
        setLoading(false)
      }
    }
    fetchMovieDetail()
  }, [movieId]) // Re-fetch movie details if movieId changes

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container>
      <Grid container spacing={4} sx={{ marginTop: 4 }}>
        {/* Movie Image and Title Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              alt={movie.title}
              height="500"
              image={formatImageUrl(movie.image[1])}
            />
          </Card>
        </Grid>

        {/* Movie Details Section */}
        <Grid item xs={12} md={8}>
          <Typography variant="h3" sx={{ marginBottom: 2 }}>
            {movie.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 2 }}>
            Directed by: {movie.director}
          </Typography>

          {/* Genre Chips */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Genres:</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
              {movie.genre.map((genre, index) => (
                <Chip key={index} label={genre} sx={{ margin: 0.5 }} color="primary" />
              ))}
            </Box>
          </Box>

          {/* Cast Section */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Cast:</Typography>
            <Typography variant="body1">{movie.cast.join(', ')}</Typography>
          </Box>

          {/* Movie Description */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Description:</Typography>
            <Typography variant="body1">{movie.description}</Typography>
          </Box>

          {/* Rating and Duration */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Rating: {movie.rating}</Typography>
            <Typography variant="body1">Duration: {movie.duration} min</Typography>
          </Box>

          {/* Release Date */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography variant="h6">Release Date:</Typography>
            <Typography variant="body1">
              {new Date(movie.releaseDate).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Trailer Link */}
          {movie.trailerLink && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                href={movie.trailerLink}
                target="_blank"
                sx={{ marginTop: 2 }}
              >
                Watch Trailer
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default MovieDetail
