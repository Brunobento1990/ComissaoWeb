import Venda from '#models/venda'
import { DateTime } from 'luxon'
import { VendedorViewModel } from './vendedor_view_model.js'

export class VendaViewModel {
  id: number
  vendedorId: number
  vendedor: VendedorViewModel | null
  valor: number
  valorComissao: number
  createdAt: DateTime
  updatedAt?: DateTime

  constructor(venda: Venda) {
    this.id = venda.id
    this.vendedorId = venda.vendedorId
    this.valor = venda.valor
    this.valorComissao = venda.valorComissao
    this.createdAt = venda.createdAt
    this.updatedAt = venda.updatedAt
    this.vendedor = venda.vendedor ? new VendedorViewModel(venda.vendedor) : null
  }
}
