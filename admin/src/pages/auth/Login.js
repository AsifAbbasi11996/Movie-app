import React, { useState } from 'react'
import axios from 'axios'
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Handle Login
  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      )
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user)) // Store user info
      navigate('/')
    } catch (err) {
      setError('Invalid credentials. Please try again.')
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
          paddingTop: 4,
          paddingBottom: 6
        }}
      >
        <Typography variant='h5' sx={{ marginBottom: 2 }}>
          Login
        </Typography>

        {error && (
          <Typography color='error' variant='body2' sx={{ marginBottom: 2 }}>
            {error}
          </Typography>
        )}

        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
          }}
          onSubmit={e => e.preventDefault()}
        >
          {/* Email Input */}
          <TextField
            label='Email'
            variant='outlined'
            fullWidth
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Password Input */}
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            fullWidth
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            variant='contained'
            color='primary'
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            Login
          </Button>

          {/* Register Link */}
          <Grid container justifyContent='center'>
            <Grid item>
              <Typography variant='body2'>
                Don't have an account?{' '}
                <Button color='secondary' onClick={() => navigate('/register')}>
                  Register
                </Button>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
