// src/pages/HomePage.js

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Grid, CircularProgress, Typography, Card, CardContent, CardMedia, Button } from '@mui/material'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all movies from backend
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://movie-app-backend-production-21f6.up.railway.app/api/movies')
        setMovies(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching movies', err)
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Top Movies
      </Typography>
      <Grid container spacing={3}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                alt={movie.title}
                height="200"
                image={movie.image || 'https://via.placeholder.com/300x200'}
              />
              <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2">{movie.description}</Typography>
                <Link to={`/movie/${movie._id}`}>
                  <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default HomePage
