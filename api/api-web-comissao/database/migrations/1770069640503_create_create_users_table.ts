import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.string('nome', 255).notNullable()

      table.string('email', 255).notNullable().unique()

      table.string('senha', 500).notNullable()
      table.boolean('ativo').defaultTo(true).notNullable()

      table.index(['email'], 'users_email_index')

      table.index(['ativo', 'email'], 'users_ativo_email_index')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
