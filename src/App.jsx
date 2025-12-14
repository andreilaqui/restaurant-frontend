// 🔧 Core React
import React from 'react';

// 🌐 Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';


// 🧩 Pages
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
// customer
import HomePage from './pages/customer/HomePage';
import MenuPage from './pages/customer/MenuPage';
import ReservationsPage from './pages/customer/ReservationsPage';
import CartPage from './pages/customer/CartPage';
import ContactPage from './pages/customer/ContactPage';
// admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminReports from './pages/admin/AdminReports';

// 🧱 Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ScrollUp from './components/common/ScrollUp';

function App() {

  return (
    <BrowserRouter>
      <Header />

      <ScrollUp /> {/* will scroll up the page when route changes  */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/reservations" element={<ReservationsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Admin-only */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute role="admin">
              <AdminReports />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App
