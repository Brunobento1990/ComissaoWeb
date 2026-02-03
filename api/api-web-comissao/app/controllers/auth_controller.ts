import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import LoginService from '#services/login_service'
import { loginValidator } from '#validators/login_validator'
import BaseController from './base_controller.js'

export default class AuthController extends BaseController {
  /**
   * @login
   * @operationId loginUser
   * @summary Autenticar usuário no sistema (login)
   * @description Realiza o login do usuário com email e senha, retornando um token JWT válido por 7 dias
   * @tag AUTENTICAÇÃO
   * @requestBody {"email": "string *required", "senha": "string *required minLength:6"}
   * @responseBody 200 - {"message": "string", "data": {"user": {"id": "number", "nome": "string", "email": "string"}, "token": "string"}}
   * @responseBody 401 - {"message": "string"} - Credenciais inválidas
   * @responseBody 422 - {"message": "string", "errors": []} - Erro de validação
   */
  @inject()
  async login({ request, response }: HttpContext, loginService: LoginService) {
    const payload = await request.validateUsing(loginValidator)

    const result = await loginService.authenticate(payload.email, payload.senha)

    return BaseController.resultado(result, { response } as any)
  }

  /**
   * @summary Obter dados do usuário autenticado (me)
   * @description Retorna os dados do usuário atualmente autenticado
   * @tag AUTENTICAÇÃO
   * @security bearerAuth
   * @responseBody 200 - {"message": "string", "user": {"id": "number", "nome": "string", "email": "string"}}
   */
  async me({ auth, response }: HttpContext) {
    return response.ok({
      message: 'Usuário autenticado',
      user: auth.user,
    })
  }
}
