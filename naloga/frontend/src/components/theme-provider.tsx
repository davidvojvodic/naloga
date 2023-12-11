import { createContext, useContext, useEffect, useState } from "react";

// Definira tip za temo (Theme)
type Theme = "dark" | "light" | "system";

// Definira lastnosti za komponento ThemeProvider
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

// Definira stanje za komponento ThemeProvider
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Začetno stanje
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

// Ustvari kontekst za ThemeProvider
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom kuka za uporabo teme
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error(
      "useTheme mora biti uporabljen znotraj komponente ThemeProvider"
    );

  return context;
};
