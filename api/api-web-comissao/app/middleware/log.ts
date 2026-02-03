import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class LogMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    try {
      return next()
    } catch (error) {
      return ctx.response.unauthorized({
        erros: error.message || ['Erro ao processar a requisição'],
      })
    }
  }
}
