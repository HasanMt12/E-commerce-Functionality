import React, { createContext, useContext, useState } from 'react';

// Create a context for isOpen state
const IsOpenContext = createContext();

// Create a custom hook to use the isOpen context
export const useIsOpen = () => useContext(IsOpenContext);

// IsOpen provider component to wrap the application
export const IsOpenProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsOpenContext.Provider>
  );
};
