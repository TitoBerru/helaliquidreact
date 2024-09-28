// src/components/Dashboard.js
import React from 'react';
import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import SectionThree from './SectionThree';
import SectionFour from './SectionFour';
import FooterDashboard from './FooterDashboard';
import '../Dashboard/Dashboard.css';
import { FaPlus } from 'react-icons/fa';


const Dashboard = ({ openDrawer }) => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
      <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
      </div>
      <FooterDashboard />
    </div>
  );
};

export default Dashboard;

