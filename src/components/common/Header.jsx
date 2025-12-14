// 🔧 Core React
import { Link } from "react-router-dom";
import { useState, useContext } from "react";

// 🧱 Components
import ThemeToggle from "./ThemeToggle";
import AuthStatus from "./AuthStatus";

// 🎨 Styling
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// 🛡️ Context
import { AuthContext } from "../../context/AuthContext"; // adjust path if needed


function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //const role = localStorage.getItem("role");
  const { role } = useContext(AuthContext); 

  return (
    <header className="bg-sunrice-cream text-sunrice-brown
                       dark:bg-white/10 dark:backdrop-blur-md dark:border-b dark:border-white/20 dark:text-sunrice-cream
                         shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">

        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-6 font-bold text-xl text-sunrice-brown dark:text-sunrice-yellow">
          <img src="icons/sunricelogo.png"
            alt="Manila Sunrice Logo"
            className="logo-img"
            style={{ maxWidth: "48px", height: "auto", clear: "none" }} />
          <span className="tracking-wide">Manila Sunrice</span>
        </Link>



        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm font-medium">
          <Link to="/" className="hover:text-sunrice-yellow">Home</Link>
          <Link to="/menu" className="hover:text-sunrice-yellow">Menu</Link>
          <Link to="/reservations" className="hover:text-sunrice-yellow">Reservations</Link>
          <Link to="/cart" className="hover:text-sunrice-yellow">Cart</Link>
          <Link to="/contact" className="hover:text-sunrice-yellow">Contact</Link>
          {role === "admin" && (
            <>
              <Link to="/admin" className="hover:text-sunrice-yellow">Dashboard</Link>
              <Link to="/reports" className="hover:text-sunrice-yellow">Reports</Link>
            </>
          )}
          <span className="pl-3 ml-3 border-l border-sunrice-brown dark:border-sunrice-cream">
            <AuthStatus />
          </span>

        </nav>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block sm:hidden text-sunrice-brown dark:text-sunrice-yellow"
          aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? (<XMarkIcon className="h-6 w-6" />) : (<Bars3Icon className="h-6 w-6" />)} {/* switch ⛌ or ☰ */}
        </button>
      </div>

      {/* Mobile Dropdown Panel */}
      <div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>

        <nav className="flex flex-col px-6 py-4 space-y-3 bg-sunrice-cream dark:bg-white/10 border-t dark:border-white/20">
          {/* Main Links */}
          <Link to="/" className="hover:text-sunrice-yellow">Home</Link>
          <Link to="/menu" className="hover:text-sunrice-yellow">Menu</Link>
          <Link to="/reservations" className="hover:text-sunrice-yellow">Reservations</Link>
          <Link to="/cart" className="hover:text-sunrice-yellow">Cart</Link>
          <Link to="/contact" className="hover:text-sunrice-yellow">Contact</Link>

          {/* Admin Group */}
          {role === "admin" && (
            <>
              <div className="pt-4 border-t dark:border-white/20 flex flex-col space-y-2">
                <p className="text-xs uppercase tracking-wide text-sunrice-brown dark:text-sunrice-yellow mb-2">
                  Admin
                </p>
                <Link to="/admin" className="block pl-2 hover:text-sunrice-yellow">
                  Dashboard
                </Link>
                <Link to="/reports" className="block pl-2 hover:text-sunrice-yellow">
                  Reports
                </Link>
              </div>
            </>
          )}

          <div className="pt-4 border-t dark:border-white/20">
            <AuthStatus />
          </div>





        </nav>
      </div>
    </header>
  );
}

export default Header;