// src/components/SectionThree.js
import React, { useState, useEffect } from 'react';
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
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   // useEffect para realizar la consulta a la API cuando el componente se monte
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares'); 
        if (!response.ok) {
          throw new Error('Error al consultar la API');
        }
        const data = await response.json();
        setApiData(data.slice(0,2));
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mostrar un mensaje de carga mientras se consulta la API
  if (loading) {
    return <div className="footer">Cargando datos...</div>;
  }

  // Mostrar un mensaje de error si algo sale mal
  if (error) {
    return <div className="footer">Error: {error}</div>;
  }

  
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
