import { UserPaginacao } from "../pages/users";
import { UserForm } from "../pages/users/form";
import { IRoutes } from "../types/IRoutes";

export const UsersRoutes: IRoutes = {
  caminho: "/users",
  children: <UserPaginacao />,
  titulo: "Usuários",
};

export const UsersRoutesCreate: IRoutes = {
  caminho: "/users/adicionar",
  children: <UserForm action="create" />,
  titulo: "Adicionar Usuário",
};
export const UsersRoutesEdit: IRoutes = {
  caminho: "/users/editar/:id",
  children: <UserForm action="edit" />,
  titulo: "Editar Usuário",
};

export const UsersRoutesView: IRoutes = {
  caminho: "/users/visualizar/:id",
  children: <UserForm action="view" />,
  titulo: "Visualizar Usuário",
};
