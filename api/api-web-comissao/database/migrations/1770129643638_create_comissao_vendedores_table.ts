import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comissao_vendedores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('vendedor_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('vendedores')
        .onDelete('CASCADE')
      table.decimal('valor_fixo', 10, 2).notNullable().defaultTo(0)
      table.decimal('percentual_por_venda', 5, 2).notNullable().defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
