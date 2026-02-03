import { TableIndex } from "../../components/tabela-paginacao";
import { IVenda } from "../../types/Venda";
import { formatMoney } from "../../utils/Mascaras";

export function VendaPaginacao() {
  return (
    <TableIndex
      columns={[
        {
          field: "vendedor",
          width: 300,
          headerName: "Vendedor",
          cellRenderer: (params: { data: any }) => params.data.vendedor?.nome,
        },
        {
          field: "valor",
          headerName: "Valor",
          cellRenderer: (params: { data: IVenda }) =>
            formatMoney(params.data.valor),
        },
        {
          field: "comissao",
          headerName: "Comissão",
          cellRenderer: (params: { data: IVenda }) =>
            formatMoney(params.data.valorComissao),
        },
      ]}
      url="vendas/paginacao"
      urlAdd="/vendas/adicionar"
      urlView="/vendas/visualizar"
      nomeDaTabela="vendas"
    />
  );
}
