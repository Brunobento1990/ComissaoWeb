import Result from '../utils/result.js'
import type { HttpContext } from '@adonisjs/core/http'

export default class BaseController {
  static resultado<T>(result: Result<T>, { response }: HttpContext): void {
    if (!result.sucesso()) {
      return response.status(result.statusCode || 400).send({
        erros: result.erros(),
      })
    }

    return response.ok(result.valor)
  }
}
