import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  // fetches user system theme preference
  const fetchLocalTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("userTheme")) || false
  );
  
  // update theme
  const updateTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  // store fetched theme of user system on initial render
  useEffect(() => {
    localStorage.setItem("userTheme", JSON.stringify(fetchLocalTheme));
  }, []);

  // update localstorage theme
  useEffect(() => {
    localStorage.setItem("userTheme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
