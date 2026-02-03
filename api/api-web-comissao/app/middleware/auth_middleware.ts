import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import LoginService from '#services/login_service'

/**
 * Auth middleware para validar JWT token
 */
export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const authHeader = ctx.request.header('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ctx.response.unauthorized({
        erros: ['Token de autenticação não fornecido'],
      })
    }

    const token = authHeader.replace('Bearer ', '').replace('undefined ', '')

    try {
      const loginService = new LoginService()
      const decoded = await loginService.verifyToken(token)

      // Adiciona os dados do usuário no contexto
      ctx.auth = {
        user: decoded,
      }

      return next()
    } catch (error) {
      return ctx.response.unauthorized({
        erros: ['Token inválido ou expirado'],
      })
    }
  }
}

// Extensão do tipo HttpContext para incluir auth
declare module '@adonisjs/core/http' {
  interface HttpContext {
    auth: {
      user: {
        userId: number
        email: string
        nome: string
      }
    }
  }
}
