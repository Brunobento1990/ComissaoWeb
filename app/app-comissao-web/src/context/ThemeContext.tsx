import { CssBaseline, ThemeProvider } from "@mui/material";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocalStorageApp } from "../hooks/UseLocalStorageApp";
import { DarkTheme } from "../theme/DarkTheme";
import { LigthTheme } from "../theme/LigthTheme";

interface IAppThemeContext {
  mode: Theme;
  handleMode: () => void;
}

interface IAppThemeProvider {
  children: ReactNode;
}

export type Theme = "dark" | "light";

export const AppThemeContext = createContext({
  mode: "dark",
  handleMode: () => console.log(),
} as IAppThemeContext);

export function AppThemeProvider(props: IAppThemeProvider) {
  const { getItem, setItem } = useLocalStorageApp();
  const [mode, setMode] = useState<Theme>("light");
  function handleMode() {
    const novoMode = mode === "dark" ? "light" : "dark";
    setMode(novoMode);
    setItem("theme", novoMode);
  }

  function init() {
    const temaLocalStorage = getItem<Theme>("theme");
    if (temaLocalStorage) {
      setMode(temaLocalStorage);
      return;
    }

    if (window.matchMedia) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        if (mode === "dark") {
          return;
        }
        setMode("dark");
      } else {
        if (mode === "light") {
          return;
        }
        setMode("light");
      }
    }
  }

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = mode === "dark" ? DarkTheme : LigthTheme;
  return (
    <AppThemeContext.Provider
      value={{
        mode,
        handleMode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(AppThemeContext);
}
