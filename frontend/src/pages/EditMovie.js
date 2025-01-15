import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

const EditMovie = () => {
  const { id } = useParams() // Get the movie ID from URL params
  const [movie, setMovie] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rating, setRating] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [duration, setDuration] = useState('')
  const [genre, setGenre] = useState('')
  const [director, setDirector] = useState('')
  const [cast, setCast] = useState('')
  const [language, setLanguage] = useState('')
  const [country, setCountry] = useState('')
  const [trailerLink, setTrailerLink] = useState('')
  const [images, setImages] = useState([]) // For the images to be updated
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Fetch movie details on component mount
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/movies/get/${id}`
        )
        const movieData = response.data
        setMovie(movieData)
        setTitle(movieData.title)
        setDescription(movieData.description)
        setRating(movieData.rating)
        setReleaseDate(movieData.releaseDate)
        setDuration(movieData.duration)
        setGenre(movieData.genre)
        setDirector(movieData.director)
        setCast(movieData.cast)
        setLanguage(movieData.language)
        setCountry(movieData.country)
        setTrailerLink(movieData.trailerLink)
      } catch (err) {
        setError('Failed to fetch movie details')
        console.error(err)
      }
    }
    fetchMovie()
  }, [id])

  // Handle file input change
  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files)
    if (selectedFiles.length <= 5) {
      setImages(selectedFiles)
    } else {
      setError('You can upload a maximum of 5 images.')
    }
  }

  // Handle the rating input to allow decimal values
  const handleRatingChange = e => {
    const value = e.target.value
    if (/^\d*\.?\d*$/.test(value)) {
      setRating(value)
    }
  }

  // Handle form submission for updating the movie
  const handleSubmit = async e => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    formData.append('rating', rating)
    formData.append('releaseDate', releaseDate)
    formData.append('duration', duration)
    formData.append('genre', genre)
    formData.append('director', director)
    formData.append('cast', cast)
    formData.append('language', language)
    formData.append('country', country)
    formData.append('trailerLink', trailerLink)

    images.forEach(image => {
      formData.append('image', image)
    })

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `http://localhost:5000/api/movies/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      navigate(`/movie/${id}`) // Redirect to movie details page
    } catch (err) {
      setError('Failed to update movie. Please try again.')
      console.error(err)
    }
  }

  if (!movie) {
    return (
      <Container maxWidth='md' sx={{ mt: 5 }}>
        <Typography variant='h4' align='center' gutterBottom>
          Loading Movie Data...
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth='md' sx={{ mt: 5 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Edit Movie
      </Typography>

      {error && (
        <Typography color='error' variant='body2' align='center'>
          {error}
        </Typography>
      )}

      <Box component='form' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label='Title'
              variant='outlined'
              fullWidth
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Rating'
              variant='outlined'
              fullWidth
              value={rating}
              onChange={handleRatingChange}
              required
              inputProps={{ min: 0, max: 10 }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Description'
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Release Date'
              type='date'
              variant='outlined'
              fullWidth
              value={releaseDate}
              onChange={e => setReleaseDate(e.target.value)}
              required
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Duration (minutes)'
              type='number'
              variant='outlined'
              fullWidth
              value={duration}
              onChange={e => setDuration(e.target.value)}
              required
              inputProps={{ min: 1 }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Genre'
              variant='outlined'
              fullWidth
              value={genre}
              onChange={e => setGenre(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Director'
              variant='outlined'
              fullWidth
              value={director}
              onChange={e => setDirector(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Cast'
              variant='outlined'
              fullWidth
              value={cast}
              onChange={e => setCast(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Language'
              variant='outlined'
              fullWidth
              value={language}
              onChange={e => setLanguage(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Country'
              variant='outlined'
              fullWidth
              value={country}
              onChange={e => setCountry(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label='Trailer Link'
              variant='outlined'
              fullWidth
              value={trailerLink}
              onChange={e => setTrailerLink(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              type='file'
              onChange={handleFileChange}
              multiple
              accept='image/*'
              style={{ width: '100%' }}
            />
            <Typography variant='body2' color='textSecondary'>
              (You can upload up to 5 images)
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
            >
              Update Movie
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default EditMovie
