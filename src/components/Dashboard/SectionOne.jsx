// src/components/SectionOne.js
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Sections.css';
import { AppContext } from '../../AppContext'; // Importa el AppContext

const SectionOne = () => {
  const { responseData } = useContext(AppContext);
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/salesProspect');
       
        setSalesData(response.data); // Guardar los datos de la API en el estado
        setLoading(false);
      } catch (error) {
        console.log(error)
        setError('Error al obtener los datos');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Formateo fecha
  const formatearFecha = (fechaIso) => {
    const fecha = new Date(fechaIso);
  
    const pad = (n) => (n < 10 ? '0' + n : n);
  
    const year = fecha.getFullYear();
    const month = pad(fecha.getMonth() + 1); // Los meses empiezan desde 0
    const day = pad(fecha.getDate());
    const hours = pad(fecha.getHours());
    const minutes = pad(fecha.getMinutes());
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  // termina formateo de fecha


  if (loading) {
    return <div className="section-two">Cargando datos de ventas...</div>;
  }

  if (error) {
    return <div className="section-two">Error: {error}</div>;
  }
  
  return (
    <div className="section-two">
      <h2>PRESUPUESTOS</h2>
      {salesData && salesData.length > 0 ? (
        <div className="sales-data">
          {salesData.map((sale, index) => (
            <div key={index}>
              <p><strong>Cliente:</strong> {sale.NombreCliente}</p>
              <p><strong>Receta:</strong> {sale.NombreReceta}</p>
              <p><strong>Cantidad Unidades:</strong> {sale.CantidadUnitaria}</p>
              <p><strong>Precio de Venta:</strong> {sale.PrecioVenta}</p>
              <p><strong>Costo:</strong> {sale.CostoTotal}</p>
              <p><strong>Ganancia:</strong> {sale.Ganancia}</p>
              <p><strong>Fecha de Venta:</strong> {formatearFecha(sale.FechaVenta)}</p>

            </div>
          ))}
        </div>
      ) : (
        <p>No hay datos disponibles</p>
      )}
    </div>
  );
   
};

export default SectionOne;
