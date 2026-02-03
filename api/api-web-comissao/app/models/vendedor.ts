import { column, hasOne, hasMany } from '@adonisjs/lucid/orm'
import type { HasOne, HasMany } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import ComissaoVendedor from './comissao_vendedor.js'
import Venda from './venda.js'

export default class Vendedor extends BaseModel {
  static table = 'vendedores'

  @column()
  declare nome: string

  @column()
  declare ativo: boolean

  @hasOne(() => ComissaoVendedor, {
    foreignKey: 'vendedorId',
  })
  declare comissao: HasOne<typeof ComissaoVendedor>

  @hasMany(() => Venda, {
    foreignKey: 'vendedorId',
  })
  declare vendas: HasMany<typeof Venda>

  calcularComissao(valorVenda: number): number {
    if (!this.comissao) {
      return 0
    }

    const comissaoFixa = this.comissao.valorFixo || 0
    const comissaoVariavel = this.comissao.percentualPorVenda
      ? (this.comissao.percentualPorVenda * valorVenda) / 100
      : 0

    const valorComissao = comissaoFixa + comissaoVariavel

    if (!valorComissao) {
      return 0
    }

    return (valorComissao * 100) / 100
  }
}
