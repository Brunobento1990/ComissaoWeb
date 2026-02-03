import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import {
  AppBar,
  Box,
  IconButton,
  InputAdornment,
  Toolbar,
  Typography,
} from "@mui/material";
import { SidebarApp } from "./Sidebar";
import { IconApp } from "../components/icon/IconApp";
import { useThemeContext } from "../context/ThemeContext";
import { BoxApp } from "../components/box/BoxApp";
import { MenuUser } from "./MenuUsuario";

interface LayoutMainProps {
  titulo: string;
  children: ReactNode;
}

const drawerWidth = 240;

export function LayoutMain({ titulo, children }: LayoutMainProps) {
  const { handleMode } = useThemeContext();

  return (
    <AuthProvider>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar>
            <BoxApp display="flex" justifyContent="space-between" width="100%">
              <Typography variant="h6" noWrap component="div">
                {titulo}
              </Typography>
              <BoxApp display="flex" alignItems="center">
                <InputAdornment position="end">
                  <IconButton onClick={handleMode} size="small">
                    <IconApp icon={"line-md:light-dark"} />
                  </IconButton>
                </InputAdornment>
                <MenuUser />
              </BoxApp>
            </BoxApp>
          </Toolbar>
        </AppBar>
        <SidebarApp />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AuthProvider>
  );
}
