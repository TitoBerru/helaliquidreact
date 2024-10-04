// src/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [responseData, setResponseData] = useState([]);
  const [salesProspects, setSalesProspects] = useState([]);  // Para consultas
  const [sales, setSales] = useState([]);  // Para ventas efectivas

  return (
    <AppContext.Provider value={{ responseData, setResponseData,
      salesProspects, setSalesProspects,
        sales, setSales,
     }}>
      {children}
    </AppContext.Provider>
  );
};
