import React, { useState } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const AddMovie = () => {
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
  const [images, setImages] = useState([]) // Changed to handle multiple images
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Handle file input change (support multiple files)
  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files) // Convert file list to array
    if (selectedFiles.length <= 5) {
      setImages(selectedFiles)
    } else {
      setError('You can upload a maximum of 5 images.')
    }
  }

  // Handle the rating input to allow decimal values
  const handleRatingChange = e => {
    const value = e.target.value
    // Allow only valid decimal numbers (regex for decimal numbers)
    if (/^\d*\.?\d*$/.test(value)) {
      setRating(value)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    // Prepare form data to send to backend
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

    // Append each selected image file to the FormData
    images.forEach(image => {
      formData.append('image', image)
    })

    try {
      // Get token from localStorage and set authorization header
      const token = localStorage.getItem('token')

      const response = await axios.post(
        'https://movie-app-backend-production-21f6.up.railway.app/api/movies/add',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      // On successful submission, navigate to the home page or movie list page
      navigate('/')
    } catch (err) {
      setError('Failed to add movie. Please try again.')
      console.error(err)
    }
  }

  return (
    <Container maxWidth='md' sx={{ mt: 5 }}>
      <Typography variant='h4' align='center' gutterBottom>
        Add New Movie
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
              onChange={handleRatingChange} // Updated to allow decimal input
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
              required
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
              Add Movie
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default AddMovie
