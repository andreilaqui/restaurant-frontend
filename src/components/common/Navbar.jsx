
import React from 'react'

import ThemeToggle from './ThemeToggle'

import { Link } from 'react-router-dom'

// THIS IS AN OLD COPY!!!

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 space-x-4">
      <h1 className="text-xl font-semibold">Restaurant App</h1>
      <Link to="/cart">Cart</Link>
      <Link to="/reservations">Reservations</Link>
      <Link to="/menu">Menu</Link>
      <ThemeToggle />
    </nav>
  )
}

export default Navbar