import React, { useState, useEffect } from 'react';
import './FooterDashboard.css';

const FooterDashboard = () => {
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

  // Mostrar los datos recibidos de la API en el footer
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Mostrar los dos primeros valores en forma horizontal */}
        {apiData && (
          <div className="footer-data">
            <span> Cotizacion {apiData[0]?.nombre}: {apiData[0]?.venta}</span>
            <span> - </span>
            <span>Cotizacion {apiData[1]?.nombre}: {apiData[1]?.venta}</span>
          </div>
        )}
      </div>
    </footer>
  );
};

export default FooterDashboard;
