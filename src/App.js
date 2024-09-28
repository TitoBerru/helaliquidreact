// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import FormDrawer from './components/FormDrawer/FormDrawer'; // Importa el FormDrawer
import 'react-modern-drawer/dist/index.css';
import './App.css';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false); // Estado para el Drawer

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const openDrawer = () => {
    setDrawerOpen(true);
  };


  return (
    <Router>
      <div className="App">
        <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        <div className="main-content">
          <Navbar toggle={toggleSidebar}  openDrawer={openDrawer} />
          <Routes>
            <Route path="/" element={<Dashboard openDrawer={openDrawer}/>} />
           
            {/* Define otras rutas aquí */}
          </Routes>
        </div>
        <FormDrawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>
    </Router>
  );
}

export default App;
