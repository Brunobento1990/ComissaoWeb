import { DateTime } from 'luxon'
import { VendedorViewModel } from './vendedor_view_model.js'

export interface ComissaoVendaDetalhe {
  vendaId: number
  valor: number
  valorComissao: number
  dataVenda: DateTime
}

export class RelatorioComissaoViewModel {
  vendedor: VendedorViewModel
  totalVendas: number
  valorTotalVendas: number
  valorTotalComissao: number
  vendas: ComissaoVendaDetalhe[]

  constructor(data: {
    vendedor: VendedorViewModel
    totalVendas: number
    valorTotalVendas: number
    valorTotalComissao: number
    vendas: ComissaoVendaDetalhe[]
  }) {
    this.vendedor = data.vendedor
    this.totalVendas = data.totalVendas
    this.valorTotalVendas = data.valorTotalVendas
    this.valorTotalComissao = data.valorTotalComissao
    this.vendas = data.vendas
  }
}
