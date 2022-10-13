import { createContext, useEffect, useState } from 'react';

type ITheme = 'light' | 'dark';

interface IThemeContextProviderProps {
  children: React.ReactNode;
}

interface IThemeContext {
  theme: ITheme | null;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => {}
});

function ThemeContextProvider({ children }: IThemeContextProviderProps) {
  const [theme, setTheme] = useState<ITheme | null>(null);

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    setTheme(localTheme ? (localTheme as ITheme) : 'light');
  }, []);

  useEffect(() => {
    if (theme === 'dark') document.body.classList.add('dark');
    else document.body.classList.remove('dark');
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export { ThemeContext, ThemeContextProvider };
