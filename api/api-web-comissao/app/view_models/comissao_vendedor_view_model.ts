import ComissaoVendedor from '#models/comissao_vendedor'

export class ComissaoVendedorViewModel {
  id: number
  valorFixo: number
  percentualPorVenda: number

  constructor(comissao: ComissaoVendedor) {
    this.id = comissao.id
    this.valorFixo = comissao.valorFixo
    this.percentualPorVenda = comissao.percentualPorVenda
  }
}
