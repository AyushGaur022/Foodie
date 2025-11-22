import React, { useState, useContext } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import { auth } from "../../firebase"; 
import { signOut } from "firebase/auth"; 

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { cartItems, user, setUser, setCartItems } = useContext(StoreContext);
  const isCartNotEmpty = Object.values(cartItems).some((qty) => qty > 0);

  const handleLogout = async () => { 
    try {
      await signOut(auth); 
      setUser(null); 
      setCartItems({});
      setDropdownOpen(false); 

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("cartItems-")) {
          localStorage.removeItem(key);
        }
      }

      alert('Logged out successfully!'); 
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Error during logout: ' + error.message); 
    }
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
        
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact-Us")}
          className={menu === "Contact-Us" ? "active" : ""}
        >
          Contact-Us
        </a>
      </ul>

      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
            {isCartNotEmpty && <div className="dot"></div>}
          </Link>
        </div>

        {user ? (
          <div className="navbar-user-dropdown">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              style={{
                color:"tomato",
                textTransform: "capitalize",
                border: "1px solid orange",
              }}
            >
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