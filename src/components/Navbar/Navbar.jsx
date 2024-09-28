// src/components/Navbar.js
import React, { useContext } from 'react';
import { FaBars, FaSun, FaMoon, FaPlus } from 'react-icons/fa';
import { ThemeContext } from './../../ThemeContext';
import './Navbar.css';

const Navbar = ({ toggle, openDrawer }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={toggle}>
        <FaBars />
      </button>
      <h1>Dashboard</h1>
      <div className="navbar-actions">
        <button className="add-btn" onClick={openDrawer}>
          <FaPlus /> Nueva Venta
        </button>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

