import { createContext, useState, useContext } from 'react';

const ThemeContext = createContext('');

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('ligth');

  const switchTheme = () => {
    setTheme((prev) => (prev === 'ligth' ? 'dark' : 'ligth'));
  };

  return (
    <ThemeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContextProvider, useThemeContext };
