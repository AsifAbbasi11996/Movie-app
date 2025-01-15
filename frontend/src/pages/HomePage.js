import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material'
import { Link } from 'react-router-dom'
import formatImageUrl from '../utils/formatImageUrl'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch all movies from backend
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies')
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
      <Typography variant='h4' sx={{ marginBottom: 2 }}>
        Top Movies
      </Typography>
      <Grid container spacing={3}>
        {movies.map(movie => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                boxShadow: 3
              }}
            >
              <CardMedia
                component='img'
                alt={movie.title}
                height='200'
                image={formatImageUrl(movie.image[0])} // Ensure the image URL is formatted correctly
                sx={{
                  objectFit: 'cover' // Ensures the image covers the card space correctly
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant='h6' noWrap>
                  {movie.title}
                </Typography>
                <Typography variant='body2' noWrap>
                  {movie.description}
                </Typography>
                <Link to={`/movie/${movie._id}`}>
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{ marginTop: 2 }}
                  >
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
