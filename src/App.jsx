// 🔧 Core React
import React from 'react';

// 🌐 Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🧩 Pages
import HomePage from './pages/customer/HomePage';
import MenuPage from './pages/customer/MenuPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import CartPage from './pages/customer/CartPage';
import ReservationsPage from './pages/customer/ReservationsPage';

// 🧱 Components
import Navbar from './components/common/Navbar';




function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
