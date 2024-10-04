import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';


const SectionThree = () => {
  const [chartData, setChartData] = useState([]);


  // Mapeo de números a nombres de meses
  const monthNames = [
    '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/year');
        // Transformar datos: Cambiar números de mes por nombres de mes
        const formattedData = response.data.map(item => ({
          mes: monthNames[item.Mes], // Cambiar número del mes a nombre
          VentasMes: parseFloat(item.VentasMes),
          CostoMes: parseFloat(item.CostoMes),
          GananciaMes: parseFloat(item.GananciaMes)
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="section-three">
      <h2>Gráfico de Ventas, Costos y Ganancias</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="mes" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="VentasMes" fill="#AD1ED9" name="Ventas" />
          <Bar dataKey="CostoMes" fill="#D91E4A" name="Costos" />
          <Bar dataKey="GananciaMes" fill="#4AD91E" name="Ganancias" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectionThree;
