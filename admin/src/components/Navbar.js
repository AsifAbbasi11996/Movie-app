import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import { AccountCircle as AccountIcon } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  // Handle user menu (login/logout)
  const handleMenuClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    // Log out user by clearing token or session
    localStorage.removeItem('token')
    handleMenuClose()
    navigate('/login') // Corrected to use 'navigate' instead of 'history.push'
  }

  return (
    <AppBar position='sticky'>
      <Toolbar>
        <Typography
          variant='h6'
          sx={{ flexGrow: 1 }}
          onClick={() => navigate('/movies')} // Navigate to home when clicked
          style={{ cursor: 'pointer' }}
        >
          MovieApp
        </Typography>

        {/* Add Movie Button */}
        {localStorage.getItem('token') && (
          <Button
            color='inherit'
            onClick={() => navigate('/add')} // Navigate to Add Movie page
            sx={{ marginRight: 2 }}
          >
            Add Movie
          </Button>
        )}

        {/* User Menu (if logged in) */}
        <IconButton
          edge='end'
          color='inherit'
          aria-label='account'
          onClick={handleMenuClick}
        >
          <AccountIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Login/Register Button (if not logged in) */}
        {!localStorage.getItem('token') && (
          <Button color='inherit' onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
        {!localStorage.getItem('token') && (
          <Button color='inherit' onClick={() => navigate('/register')}>
            Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
