import { IRoutes } from "../types/IRoutes";
import { DashboardRoute } from "./DashboardRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "../pages/login";
import { LayoutMain } from "../layout/LayoutMain";
import {
  UsersRoutes,
  UsersRoutesCreate,
  UsersRoutesEdit,
  UsersRoutesView,
} from "./UsersRoutes";
import { Page404 } from "../pages/Page404";
import {
  VendedorPaginacaoRoute,
  VendedorRoutesCreate,
  VendedorRoutesEdit,
  VendedorRoutesView,
} from "./VendedoresRoutes";
import { VendasRoutes, VendaFormCreate, VendaFormView } from "./VendaRoutes";
import { RelatorioComissaoRoutes } from "./RelatorioComissaoRoutes";

export const Rotas: IRoutes[] = [
  DashboardRoute,
  UsersRoutes,
  UsersRoutesCreate,
  UsersRoutesEdit,
  UsersRoutesView,
  VendedorPaginacaoRoute,
  VendedorRoutesCreate,
  VendedorRoutesEdit,
  VendedorRoutesView,
  VendasRoutes,
  VendaFormCreate,
  VendaFormView,
  RelatorioComissaoRoutes,
];

export function RotasMapeadas() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path={"/login"} element={<Login />} />
        {Rotas.map((rota, index) => (
          <Route
            key={index}
            path={rota.caminho}
            element={
              <LayoutMain titulo={rota.titulo}>{rota.children}</LayoutMain>
            }
          />
        ))}
      </Routes>
    </Router>
  );
}
