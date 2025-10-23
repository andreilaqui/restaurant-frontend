// 🔧 Core React
import { Link } from "react-router-dom";

// 🧱 Components
import ThemeToggle from "./ThemeToggle";


function Header() {
  return (
    <header
      className="
        bg-sunrice-cream text-sunrice-brown
        dark:bg-white/10 dark:backdrop-blur-md dark:border-b dark:border-white/20 dark:text-sunrice-cream
        shadow-sm sticky top-0 z-50
      "
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link to="/" className="font-bold text-xl text-sunrice-brown dark:text-sunrice-yellow">
          <img
            src="icons/sunricelogo.png"
            alt="Manila Sunrice Logo"
            className="logo-img"
            style={{ maxWidth: "48px", height: "auto", clear:"none" }}
          /> Manila Sunrice
        </Link>

        {/* Nav Links */}
        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/menu" className="hover:text-sunrice-yellow">Menu</Link>
          <Link to="/reservations" className="hover:text-sunrice-yellow">Reservations</Link>
          <Link to="/cart" className="hover:text-sunrice-yellow">Cart</Link>
          <Link to="/login" className="hover:text-sunrice-yellow">Login</Link>
        </nav>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;