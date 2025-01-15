import React from 'react'
import Navbar from './components/Navbar' // Import Navbar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Updated imports
import HomePage from './pages/HomePage' // Create these components as per your needs
import Register from './pages/auth/Register'
import LoginPage from './pages/auth/Login'
import Search from './pages/Search'
import MovieDetail from './components/MovieDetail'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import MovieList from './pages/MovieList'

function App () {
  return (
    <Router>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        <Route path='/' element={<HomePage />} />{' '}
        {/* Updated to use element prop */}
        <Route path='/movies' element={<MovieList />} />{' '}
        <Route path='/add' element={<AddMovie />} />{' '}
        <Route path='/edit/:id' element={<EditMovie />} />{' '}
        <Route path='/search' element={<Search />} />{' '}
        <Route path='/movie/:movieId' element={<MovieDetail />} />
        {/* Updated to use element prop */}
        <Route path='/login' element={<LoginPage />} />{' '}
        {/* Updated to use element prop */}
        <Route path='/register' element={<Register />} />{' '}
        {/* Updated to use element prop */}
      </Routes>
    </Router>
  )
}

export default App
