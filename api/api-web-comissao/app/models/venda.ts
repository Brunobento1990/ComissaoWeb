import { column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import BaseModel from './base_model.js'
import Vendedor from './vendedor.js'

export default class Venda extends BaseModel {
  static table = 'vendas'

  @column()
  declare vendedorId: number

  @column({
    consume: (value) => Number.parseFloat(value),
  })
  declare valor: number

  @column({
    consume: (value) => Number.parseFloat(value),
  })
  declare valorComissao: number

  @belongsTo(() => Vendedor, {
    foreignKey: 'vendedorId',
  })
  declare vendedor: BelongsTo<typeof Vendedor>
}
