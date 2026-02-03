import { ChipApp } from "../../components/divider/DividerApp";
import { TableIndex } from "../../components/tabela-paginacao";

export function UserPaginacao() {
  return (
    <TableIndex
      columns={[
        {
          field: "nome",
          headerName: "Nome",
        },
        {
          field: "email",
          headerName: "Email",
        },
        {
          field: "ativo",
          width: 100,
          headerName: "Ativo",
          cellRenderer: (params: { data: any }) => {
            return (
              <ChipApp
                titulo={params.data.ativo ? "Ativo" : "Inativo"}
                cor={params.data.ativo ? "success" : "error"}
              />
            );
          },
        },
      ]}
      url="users/paginacao"
      urlAdd="/users/adicionar"
      urlEdit="/users/editar"
      urlView="/users/visualizar"
      urlDelete="/users/inativar"
      nomeDaTabela="users"
    />
  );
}
