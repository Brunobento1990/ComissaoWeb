import { VendedoresPaginacao } from "../pages/vendedores";
import { VendedorForm } from "../pages/vendedores/form";
import { IRoutes } from "../types/IRoutes";

export const VendedorPaginacaoRoute: IRoutes = {
  caminho: "/vendedores",
  titulo: "Vendedores ",
  children: <VendedoresPaginacao />,
};

export const VendedorRoutesCreate: IRoutes = {
  caminho: "/vendedores/adicionar",
  children: <VendedorForm action="create" />,
  titulo: "Adicionar Vendedor",
};
export const VendedorRoutesEdit: IRoutes = {
  caminho: "/vendedores/editar/:id",
  children: <VendedorForm action="edit" />,
  titulo: "Editar Vendedor",
};

export const VendedorRoutesView: IRoutes = {
  caminho: "/vendedores/visualizar/:id",
  children: <VendedorForm action="view" />,
  titulo: "Visualizar Vendedor",
};
