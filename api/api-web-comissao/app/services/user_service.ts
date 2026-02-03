import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { PaginacaoRequest, PaginacaoResponse } from '../DTOs/paginacao.js'
import Result from '../utils/result.js'
import { UserViewModel } from '../view_models/user_view_model.js'

export default class UserService {
  async paginacao(params: PaginacaoRequest): Promise<PaginacaoResponse<UserViewModel>> {
    const query = User.query()

    if (params.search) {
      query.where((builder) => {
        builder
          .where('nome', 'ilike', `%${params.search}%`)
          .orWhere('email', 'ilike', `%${params.search}%`)
      })
    }

    const count = await query.clone().count('* as total')
    const total = Number(count[0].$extras.total)

    query.orderBy(params.orderBy ?? 'id', params.asc ? 'asc' : 'desc')

    const page = Math.max(1, params.skip)
    const resultado = await query.paginate(page, params.take)

    const totalDePaginas = Math.ceil(total / params.take)

    return {
      values: resultado.all().map((user) => new UserViewModel(user)),
      totalDePaginas,
    }
  }

  async obterPorId(id: number): Promise<Result<UserViewModel>> {
    if (!id || id <= 0 || Number.isNaN(id)) {
      return Result.falhaUnica('ID do usuário é obrigatório', 400)
    }

    const user = await User.find(id)
    if (!user) {
      return Result.falhaUnica('Usuário não encontrado', 404)
    }

    return Result.sucesso(new UserViewModel(user))
  }

  async inativar(id: number): Promise<Result<boolean>> {
    if (!id || id <= 0 || Number.isNaN(id)) {
      return Result.falhaUnica('ID do usuário é obrigatório', 400)
    }

    const user = await User.find(id)
    if (!user) {
      return Result.falhaUnica('Usuário não encontrado', 404)
    }

    user.merge({ ativo: false })
    await user.save()

    return Result.sucesso(true)
  }

  async create(newUser: Partial<User>): Promise<Result<UserViewModel>> {
    const userValidacao = await User.findBy('email', newUser.email)
    if (userValidacao) {
      return Result.falhaUnica('Email já cadastrado', 400)
    }

    const user = await User.create({
      ...newUser,
      senha: await hash.make(newUser.senha || ''),
    })
    return Result.sucesso(new UserViewModel(user))
  }

  async update(userUpdate: Partial<User>): Promise<Result<UserViewModel>> {
    const user = await User.find(userUpdate.id)
    if (!user) {
      return Result.falhaUnica('Usuário não encontrado', 404)
    }

    const emailEmUso = await User.query()
      .where('email', userUpdate.email || '')
      .whereNot('id', userUpdate.id || 0)
      .first()

    if (emailEmUso) {
      return Result.falhaUnica('Email já cadastrado', 400)
    }

    user.merge({
      ...userUpdate,
      senha: userUpdate.senha ? await hash.make(userUpdate.senha) : user.senha,
    })
    await user.save()

    return Result.sucesso(new UserViewModel(user))
  }
}
