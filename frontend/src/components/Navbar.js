import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material'
import {
  Search as SearchIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

  // Handle search input change
  const handleSearchChange = event => {
    setSearchQuery(event.target.value)
  }

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Redirect to the search page with query params
      navigate(`/search?q=${searchQuery}`)
    }
  }

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
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate('/')} // Navigate to home when clicked
          style={{ cursor: 'pointer' }}
        >
          MovieApp
        </Typography>

        {/* All Movies Button */}
        <Button
          color="inherit"
          onClick={() => navigate('/movies')} // Navigate to All Movies page
          sx={{ marginRight: 2 }}
        >
          Top Movies
        </Button>

        {/* Search Bar */}
        <div style={{ position: 'relative', marginRight: '20px' }}>
          <InputBase
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Movies…"
            inputProps={{ 'aria-label': 'search' }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              padding: '5px 10px',
              width: '200px'
            }}
          />
          <IconButton
            type="button"
            onClick={handleSearchSubmit}
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)'
            }}
          >
            <SearchIcon />
          </IconButton>
        </div>

        {/* User Menu (if logged in) */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account"
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
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
        {!localStorage.getItem('token') && (
          <Button color="inherit" onClick={() => navigate('/register')}>
            Register
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
