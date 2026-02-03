import Vendedor from '#models/vendedor'
import { DateTime } from 'luxon'
import { ComissaoVendedorViewModel } from './comissao_vendedor_view_model.js'

export class VendedorViewModel {
  id: number
  nome: string
  ativo: boolean
  comissao: ComissaoVendedorViewModel | null
  createdAt: DateTime
  updatedAt?: DateTime

  constructor(vendedor: Vendedor) {
    this.id = vendedor.id
    this.nome = vendedor.nome
    this.ativo = vendedor.ativo
    this.comissao = vendedor.comissao ? new ComissaoVendedorViewModel(vendedor.comissao) : null
    this.createdAt = vendedor.createdAt
    this.updatedAt = vendedor.updatedAt
  }
}
