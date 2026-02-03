import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendas'

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
      table.decimal('valor', 10, 2).notNullable()
      table.decimal('valor_comissao', 10, 2).notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
