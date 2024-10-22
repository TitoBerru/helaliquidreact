import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Sections.css';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#567BF5', '#FF8042', "#786976", "#A78EF5", "#ef9af1", "#8fee56", "#d469a1","#07D3F2"];
// const COLORS = ['#0088FE', '#00C49F', '#567BF5', '#FF8042', "#786976", "#A78EF5", "#ef9af1", "#8fee56", "#d469a1","#07D3F2"];

const SectionFour = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTopRecipesData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/topRecipes');
        
        // Convertir 'resultado' a número
        const formattedData = response.data.map(item => ({
          ...item,
          resultado: parseFloat(item.resultado), // Convertir resultado a número
        }));

        setData(formattedData);
        console.log(formattedData); // Verifica que los datos están bien formateados
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopRecipesData();
  }, []);

  return (
    <div className="section-four">
      <h3>Distribución de Productos</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          {data.length > 0 && (
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ NombreReceta, percent }) => `${NombreReceta} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="resultado"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          )}
          <Tooltip />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectionFour;
