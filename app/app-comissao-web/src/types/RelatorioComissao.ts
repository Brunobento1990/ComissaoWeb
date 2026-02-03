import { IVendedor } from "./Vendedor";

export interface IRelatorioComissaoRequest {
  vendedorId: number;
  vendedor: IVendedor;
  dataInicio: string;
  dataFim: string;
}

export interface IItemRelatorioComissaoResponse {
  vendaId: number;
  valor: number;
  valorComissao: number;
  dataVenda: string;
}

export interface IRelatorioComissaoResponse {
  vendedor: IVendedor;
  totalVendas: number;
  valorTotalVendas: number;
  valorTotalComissao: number;
  vendas: IItemRelatorioComissaoResponse[];
}
