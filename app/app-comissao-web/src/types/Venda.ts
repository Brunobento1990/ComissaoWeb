import { IVendedor } from "./Vendedor";

export interface IVenda {
  id: number;
  vendedorId: number;
  valor: number;
  valorComissao: number;
  createdAt: string;
  updatedAt?: string;
  vendedor: IVendedor;
}
