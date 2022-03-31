import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  // fetches user system theme preference
  const fetchLocalTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("userTheme"))
  );

  const updateTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  useEffect(() => {
    localStorage.setItem("userTheme", fetchLocalTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
