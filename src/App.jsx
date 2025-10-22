// 🔧 Core React
import React from 'react';

// 🌐 Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 🧩 Pages
import LoginPage from './pages/LoginPage';
  // customer
import HomePage from './pages/customer/HomePage';
import MenuPage from './pages/customer/MenuPage';
import ReservationsPage from './pages/customer/ReservationsPage';
import CartPage from './pages/customer/CartPage';
  // admin
import AdminDashboard from './pages/admin/AdminDashboard';

// 🧱 Components
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';



function App() {

  return (
    <BrowserRouter>
      <Header />
      <div className="container p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
