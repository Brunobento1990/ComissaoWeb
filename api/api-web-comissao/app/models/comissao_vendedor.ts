import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import Vendedor from './vendedor.js'

export default class ComissaoVendedor extends BaseModel {
  static table = 'comissao_vendedores'

  @column()
  declare vendedorId: number

  @column({
    consume: (value) => Number.parseFloat(value),
  })
  declare valorFixo: number

  @column({
    consume: (value) => Number.parseFloat(value),
  })
  declare percentualPorVenda: number

  @belongsTo(() => Vendedor, {
    foreignKey: 'vendedorId',
  })
  declare vendedor: BelongsTo<typeof Vendedor>
}
