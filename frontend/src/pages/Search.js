// src/components/Search.js

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Box,
  CircularProgress
} from '@mui/material'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import formatImageUrl from '../utils/formatImageUrl' // Assuming this utility formats the image URL

const Search = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q') // Extract query parameter

  // Fetch movies based on the query parameter
  useEffect(() => {
    if (query) {
      setLoading(true)
      setError('')
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://movie-app-backend-production-21f6.up.railway.app/api/movies/search?query=${query}`
          )
          setMovies(response.data)
          setLoading(false)
        } catch (err) {
          setError('Failed to fetch movies')
          setLoading(false)
        }
      }

      fetchMovies()
    }
  }, [query])

  return (
    <Container maxWidth='lg' sx={{ mt: 5 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Search Results for "{query}"
      </Typography>

      {loading && (
        <CircularProgress
          color='primary'
          sx={{ display: 'block', margin: '0 auto' }}
        />
      )}

      {error && (
        <Typography color='error' align='center'>
          {error}
        </Typography>
      )}

      {movies.length === 0 && !loading && !error && (
        <Typography align='center'>No movies found.</Typography>
      )}

      {/* Movie Cards Grid */}
      <Grid container spacing={3}>
        {movies.map(movie => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <Card sx={{ maxWidth: 250, height: '100%', boxShadow: 3 }}>
              <CardMedia
                component='img'
                alt={movie.title}
                height='180'
                image={formatImageUrl(movie.image[0])} // Assuming first image is the main poster
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ padding: '16px' }}>
                <Typography variant='h6' component='div' noWrap>
                  {movie.title}
                </Typography>
                <Typography variant='body2' color='text.secondary' noWrap>
                  {movie.description.slice(0, 100)}...
                </Typography>
              </CardContent>
              <Box sx={{ padding: '16px' }}>
                <Button
                  component={Link}
                  to={`/movie/${movie._id}`}
                  variant='contained'
                  color='secondary'
                  fullWidth
                  size='small'
                >
                  View Details
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Search
