// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Dashboard</h2>
        <button className="close-btn" onClick={toggle}>
          &times;
        </button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <FaHome /> Inicio
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser /> Perfil
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FaCog /> Configuración
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt /> Cerrar Sesión
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
