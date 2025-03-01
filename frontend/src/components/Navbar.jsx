import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import IMG from "../assets/logo (1).png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set login status based on token existence
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home after logout
  };

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={IMG} alt="Logo" onClick={() => handleScroll("home")} />
        </Link>
      </div>

      {/* Hamburger Icon for Mobile Menu */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Navbar Links */}
      <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => handleScroll("home")}>
          Home
        </Link>
        <a onClick={() => handleScroll("about")} className="text-blue-500 cursor-pointer">
          About
        </a>
        <a onClick={() => handleScroll("services")} className="text-blue-500 cursor-pointer">
          Services
        </a>
        <Link to="/bloglist">Blogs</Link>
        <a onClick={() => handleScroll("contact")} className="text-blue-500 cursor-pointer">
          Contact
        </a>

        {/* Conditional Login / Logout Buttons */}
        {isLoggedIn ? (
          <>
            <Link to="/blogform">Add Blog</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white">
              Login
            </Link>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
