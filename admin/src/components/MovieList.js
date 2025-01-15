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
  Avatar
} from '@mui/material'
import { Link } from 'react-router-dom'
import formatImageUrl from '../utils/formatImageUrl'

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/movies')
        setMovies(response.data)
      } catch (err) {
        setError('Failed to fetch movies')
        console.error(err)
      }
    }

    fetchMovies()
  }, [])

  return (
    <Container maxWidth='lg' sx={{ mt: 5 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Movie List
      </Typography>

      {error && (
        <Typography color='error' variant='body2' align='center'>
          {error}
        </Typography>
      )}

      <List>
        {movies.map(movie => (
          <React.Fragment key={movie._id}>
            <ListItem alignItems='flex-start'>
              <ListItemAvatar>
                <Avatar
                  alt={movie.title}
                  src={formatImageUrl(movie.image[0])} // Assuming first image is the main poster
                  sx={{
                    width: 80, // Set width of the image
                    height: 80, // Set height of the image
                    objectFit: 'cover', // Ensures the image covers the container while maintaining aspect ratio
                    borderRadius: '8px', // Optional: Adds rounded corners to the image
                    boxShadow: 2, // Optional: Adds shadow to the image for a 3D effect
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={movie.title}
                secondary={
                  <>
                    <Typography variant='body2' color='text.primary'>
                      {movie.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/edit/${movie._id}`}
                      variant='contained'
                      color='primary'
                      sx={{ mt: 2 }}
                    >
                      Edit Movie
                    </Button>
                  </>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </React.Fragment>
        ))}
      </List>
    </Container>
  )
}

export default MovieList
