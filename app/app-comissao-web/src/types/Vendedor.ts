export interface IVendedor {
  id: number;
  nome: string;
  ativo: boolean;
  comissao: IComissao;
}

export interface IComissao {
  id: number;
  valorFixo: number;
  percentualPorVenda: number;
}
