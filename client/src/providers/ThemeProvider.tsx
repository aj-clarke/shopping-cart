import React, { type ReactNode } from "react";

/*
    1. A Context object that will allow us to reference the context in child components

    2. A Context Provider that will wrap the child components that want access to the context
*/

type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  handleThemeChange: (newTheme: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>('light');


const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange}}>
      {children}
    </ThemeContext.Provider>
  )
};