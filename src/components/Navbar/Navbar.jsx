import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cartItems, user, setUser, setCartItems } =
    useContext(StoreContext);

  const isCartNotEmpty = Object.values(cartItems).some(
    (qty) => qty > 0
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setCartItems({});
      setDropdownOpen(false);
      alert("Logged out successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="navbar-menu">
        <Link to="/" className={menu === "Home" ? "active" : ""} onClick={() => setMenu("Home")}>
          Home
        </Link>
        <a href="#explore-menu">Menu</a>
        <a href="#app-download">Mobile-App</a>
        <a href="#footer">Contact-Us</a>
      </ul>

      {/* Hamburger (Mobile only) */}
      <div
        className="hamburger"
        onClick={() => setMobileMenuOpen(prev => !prev)}
      >
        ☰
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <ul className="mobile-menu">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <a href="#explore-menu" onClick={() => setMobileMenuOpen(false)}>Menu</a>
          <a href="#app-download" onClick={() => setMobileMenuOpen(false)}>Mobile-App</a>
          <a href="#footer" onClick={() => setMobileMenuOpen(false)}>Contact-Us</a>
        </ul>
      )}

      {/* Right Section */}
      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="cart" />
            {isCartNotEmpty && <div className="dot"></div>}
          </Link>
        </div>

        {user ? (
          <div className="navbar-user-dropdown">
            <button onClick={() => setDropdownOpen(prev => !prev)}>
              {user.email.split("@")[0]}
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
