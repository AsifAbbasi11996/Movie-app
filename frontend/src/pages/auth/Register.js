import React, { useState } from 'react'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'username') setUsername(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
  }

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault()

    if (!username || !email || !password) {
      setError('All fields are required!')
      return
    }

    // Make a request to register the user (you'll need to make an API call here)
    try {
      const response = await fetch('https://movie-app-backend-production-21f6.up.railway.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })

      const data = await response.json()

      if (response.status === 201) {
        // If user is registered successfully, redirect to login page
        navigate('/login')
      } else {
        setError(data.message || 'Registration failed!')
      }
    } catch (err) {
      setError('An error occurred during registration.')
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh'
        }}
      >
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        {error && (
          <Typography color='error' variant='body2' sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 8 }}>
          <TextField
            name='username'
            label='Username'
            variant='outlined'
            fullWidth
            required
            value={username}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name='email'
            label='Email'
            variant='outlined'
            fullWidth
            required
            value={email}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name='password'
            label='Password'
            variant='outlined'
            type='password'
            fullWidth
            required
            value={password}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Register
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            fullWidth
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
          </Button>
        </form>
      </Box>
    </Container>
  )
}

export default Register
