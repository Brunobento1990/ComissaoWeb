import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserService from '#services/user_service'
import BaseController from './base_controller.js'
import { userUpdateValidator, userValidator } from '#validators/user_validator'

export default class UsersController {
  /**
   * @summary Get a list of (index)
   * @tag USUÁRIOS
   * @security bearerAuth
   * @paramQuery skip - Número da página - @default(1)
   * @paramQuery take - Itens por página - @default(10)
   * @paramQuery search - Buscar por nome ou email
   * @paramQuery orderBy - Campo para ordenar - @enum(nome, email, createdAt)
   * @paramQuery order - Direção da ordenação - @enum(asc, desc)
   * @responseBody 200 - {"values": [], "quantidadeDePaginas": number}
   */
  @inject()
  async index({ request, response }: HttpContext, userService: UserService) {
    const params = request.qs()

    const resultado = await userService.paginacao({
      take: params.take ? Number(params.take) : 10,
      skip: params.skip ? Number(params.skip) : 0,
      search: params.search,
      orderBy: params.orderBy,
      asc: params.order === 'asc',
    })

    return response.ok(resultado)
  }

  /**
   * @summary (obterPorId)
   * @tag USUÁRIOS
   * @security bearerAuth
   * @paramQuery id - ID do usuário - @type(integer) - @required
   * @responseBody 200 - {"id": number, "nome": string, "email": string, "ativo": boolean, "createdAt": string, "updatedAt": string}
   * @responseBody 404 - {"message": "Usuário não encontrado"}
   */
  @inject()
  async obterPorId({ request, response }: HttpContext, userService: UserService) {
    const params = request.qs()
    const resultado = await userService.obterPorId(Number(params.id))

    return BaseController.resultado(resultado, { response } as any)
  }

  /**
   * @summary (inativar)
   * @tag USUÁRIOS
   * @security bearerAuth
   * @paramQuery id - ID do usuário - @type(integer) - @required
   * @responseBody 200
   * @responseBody 404 - {"message": "Usuário não encontrado"}
   */
  @inject()
  async inativar({ request, response }: HttpContext, userService: UserService) {
    const params = request.qs()
    const resultado = await userService.inativar(Number(params.id))

    return BaseController.resultado(resultado, { response } as any)
  }

  /**
   * @summary Create
   * @description Realiza a criação de um novo usuário com nome, email e senha
   * @tag USUÁRIOS
   * @security bearerAuth
   * @requestBody {"email": "string *required", "senha": "string *required minLength:6", "nome": "string *required minLength:3"}
   * @responseBody 200 - {"message": "string", "user": {"id": "number", "nome": "string", "email": "string"}}
   * @responseBody 400 - {"message": "string"} - Erro na criação do usuário
   * @responseBody 422 - {"message": "string", "errors": []} - Erro de validação
   */
  @inject()
  async create({ request, response }: HttpContext, userService: UserService) {
    const payload = await request.validateUsing(userValidator)

    const resultado = await userService.create(payload)

    return BaseController.resultado(resultado, { response } as any)
  }

  /**
   * @summary Update
   * @description Realiza a atualização de um usuário existente com nome, email e senha
   * @tag USUÁRIOS
   * @security bearerAuth
   * @requestBody {"email": "string *required", "senha": "string *required minLength:6", "nome": "string *required minLength:3"}
   * @responseBody 200 - {"message": "string", "user": {"id": "number", "nome": "string", "email": "string"}}
   * @responseBody 400 - {"message": "string"} - Erro na criação do usuário
   * @responseBody 422 - {"message": "string", "errors": []} - Erro de validação
   */
  @inject()
  async update({ request, response }: HttpContext, userService: UserService) {
    const payload = await request.validateUsing(userUpdateValidator)

    const resultado = await userService.update(payload)

    return BaseController.resultado(resultado, { response } as any)
  }
}
