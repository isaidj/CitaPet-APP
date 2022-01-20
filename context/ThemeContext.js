import React, {createContext} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const colors = {
    primary: '#5297ff',
    secondary: '#fff',
    background: '#fff',
  };

  const data = {
    colors,
  };

  return (
    <ThemeContext.Provider value={{data}}>{children}</ThemeContext.Provider>
  );
};
