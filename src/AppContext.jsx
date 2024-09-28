// src/AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [responseData, setResponseData] = useState([]);

  return (
    <AppContext.Provider value={{ responseData, setResponseData }}>
      {children}
    </AppContext.Provider>
  );
};
