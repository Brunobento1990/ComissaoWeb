import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { IconApp } from "../components/icon/IconApp";
import { useNavigateApp } from "../hooks/UseNavigateApp";

export function SidebarApp() {
  const { navigate } = useNavigateApp();
  return (
    <>
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/users")}>
              <ListItemIcon>
                <IconApp icon={"solar:user-outline"} />
              </ListItemIcon>
              <ListItemText primary={"Usuários"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/vendedores")}>
              <ListItemIcon>
                <IconApp icon={"solar:user-id-outline"} />
              </ListItemIcon>
              <ListItemText primary={"Vendedores"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/vendas")}>
              <ListItemIcon>
                <IconApp icon={"mdi:printer-point-of-sale-check-outline"} />
              </ListItemIcon>
              <ListItemText primary={"Vendas"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/relatorio-comissao")}>
              <ListItemIcon>
                <IconApp icon={"game-icons:pay-money"} />
              </ListItemIcon>
              <ListItemText primary={"Relatório comissão"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
