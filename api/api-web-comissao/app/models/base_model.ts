import { DateTime } from 'luxon'
import { BaseModel as LucidBaseModel, column } from '@adonisjs/lucid/orm'

export default class BaseModel extends LucidBaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt?: DateTime
}
