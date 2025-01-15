import React from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom' // Updated imports
import LoginPage from './pages/auth/Login'
import AddMovie from './components/AddMovie'
import EditMovie from './components/EditMovie'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import Navbar from './components/Navbar'

function AppContent() {
  // This component will check the current location
  const location = useLocation()

  // Condition to hide Navbar on Login and Register pages
  const showNavbar = location.pathname !== '/register' && location.pathname !== '/'

  return (
    <>
      {showNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path='/movies' element={<MovieList />} />{' '}
        <Route path='/add' element={<AddMovie />} />{' '}
        <Route path='/movie/:movieId' element={<MovieDetail />} />{' '}
        <Route path='/edit/:id' element={<EditMovie />} />{' '}
        <Route path='/' element={<LoginPage />} />{' '}
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent /> {/* Wrap the main content inside Router */}
    </Router>
  )
}

export default App
