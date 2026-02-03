import User from '#models/user'
import { DateTime } from 'luxon'

export class UserViewModel {
  id: number
  nome: string
  email: string
  ativo: boolean
  createdAt: DateTime
  updatedAt?: DateTime

  constructor(user: User) {
    this.id = user.id
    this.nome = user.nome
    this.email = user.email
    this.ativo = user.ativo
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }
}
