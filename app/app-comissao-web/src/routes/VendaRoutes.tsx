import { VendaPaginacao } from "../pages/vendas";
import { VendaForm } from "../pages/vendas/form";
import { IRoutes } from "../types/IRoutes";

export const VendasRoutes: IRoutes = {
  caminho: "/vendas",
  children: <VendaPaginacao />,
  titulo: "Vendas",
};

export const VendaFormCreate: IRoutes = {
  caminho: "/vendas/adicionar",
  children: <VendaForm action="create" />,
  titulo: "Nova Venda",
};

export const VendaFormView: IRoutes = {
  caminho: "/vendas/visualizar/:id",
  children: <VendaForm action="view" />,
  titulo: "Visualizar Venda",
};
