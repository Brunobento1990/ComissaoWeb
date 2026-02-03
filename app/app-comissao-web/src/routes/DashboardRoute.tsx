import { Dashboard } from "../pages/dashboard";
import { IRoutes } from "../types/IRoutes";

export const DashboardRoute: IRoutes = {
  caminho: "/",
  children: <Dashboard />,
  titulo: "Dashboard",
};
