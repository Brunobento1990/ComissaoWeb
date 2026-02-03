import { ChipApp } from "../../components/divider/DividerApp";
import { TableIndex } from "../../components/tabela-paginacao";

export function VendedoresPaginacao() {
  return (
    <TableIndex
      columns={[
        {
          field: "nome",
          headerName: "Nome",
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
      url="vendedores/paginacao"
      urlAdd="/vendedores/adicionar"
      urlEdit="/vendedores/editar"
      urlView="/vendedores/visualizar"
      urlDelete="/vendedores/inativar"
      nomeDaTabela="vendedores"
    />
  );
}
