// src/components/SectionThree.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Sections.css';

const data = [
  { name: 'Enero', ventas: 4000, ingresos: 2400 },
  { name: 'Febrero', ventas: 3000, ingresos: 1398 },
  { name: 'Marzo', ventas: 2000, ingresos: 9800 },
  { name: 'Abril', ventas: 2780, ingresos: 3908 },
  { name: 'Mayo', ventas: 1890, ingresos: 4800 },
  { name: 'Junio', ventas: 2390, ingresos: 3800 },
  { name: 'Julio', ventas: 3490, ingresos: 4300 },
];

const SectionThree = () => {
  

  return (
    <div className="section-three">
      <h3>Ventas e Ingresos Mensuales</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ventas" fill="#8884d8" />
          <Bar dataKey="ingresos" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectionThree;
