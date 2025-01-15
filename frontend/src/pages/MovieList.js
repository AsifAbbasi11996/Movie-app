import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Button,
  Typography,
  Divider,
  ListItemAvatar,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import formatImageUrl from '../utils/formatImageUrl'

const MovieList = () => {
  const [movies, setMovies] = useState([]) // State to store movies
  const [error, setError] = useState('') // State to handle errors
  const [sortBy, setSortBy] = useState('') // State to track selected sorting criterion

  // Fetch movies (initial load without sorting)
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = sortBy
          ? `https://movie-app-backend-production-21f6.up.railway.app/api/movies/sorted?sortBy=${sortBy}`
          : 'https://movie-app-backend-production-21f6.up.railway.app/api/movies' // Default unsorted movies

        const response = await axios.get(url)
        setMovies(response.data)
      } catch (err) {
        setError('Failed to fetch movies')
        console.error(err)
      }
    }

    fetchMovies() // Fetch movies when the component mounts or when `sortBy` changes
  }, [sortBy]) // Re-fetch if `sortBy` changes

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        Movie List
      </Typography>

      {error && (
        <Typography color="error" variant="body2" align="center" sx={{ mb: 3 }}>
          {error}
        </Typography>
      )}

      {/* Sort By Dropdown */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="duration">Duration</MenuItem>
          <MenuItem value="name">Name</MenuItem>
        </Select>
      </FormControl>

      {/* Movie List in List Format */}
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {movies.map((movie) => (
          <React.Fragment key={movie._id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                borderRadius: 2,
                boxShadow: 1,
                mb: 2,
                bgcolor: '#fff',
                '&:hover': {
                  boxShadow: 4,
                  transform: 'scale(1.02)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  alt={movie.title}
                  src={formatImageUrl(movie.image[0])} // Assuming first image is the main poster
                  sx={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {movie.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                      {movie.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        component={Link}
                        to={`/movie/${movie._id}`}
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{
                          boxShadow: 2,
                          '&:hover': {
                            backgroundColor: '#1976d2',
                          },
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  )
}

export default MovieList
