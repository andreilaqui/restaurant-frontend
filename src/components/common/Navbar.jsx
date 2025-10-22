import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <h1 className="text-xl font-semibold">Restaurant App - Live Testing</h1>
      <Link to="/cart">Cart</Link>
      <Link to="/reservations">Reservations</Link>
      <Link to="/menu">Menu</Link>
    </nav>
  )
}

export default Navbar