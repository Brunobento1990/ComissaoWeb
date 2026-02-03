import { column } from '@adonisjs/lucid/orm'
import BaseModel from './base_model.js'

export default class User extends BaseModel {
  @column()
  declare email: string

  @column()
  declare nome: string

  @column()
  declare senha: string

  @column()
  declare ativo: boolean
}
