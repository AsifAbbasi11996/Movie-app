import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom' // Updated imports
import Register from './pages/auth/Register'
import LoginPage from './pages/auth/Login'
import AddMovie from './components/AddMovie'
import EditMovie from './components/EditMovie'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MovieList />} />{' '}
        <Route path='/add' element={<AddMovie />} />{' '}
        <Route path='/view/:id' element={<MovieDetail />} />{' '}
        <Route path='/edit/:id' element={<EditMovie />} />{' '}
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
