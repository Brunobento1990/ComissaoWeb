import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import jwt from 'jsonwebtoken'
import env from '#start/env'
import Result from '../utils/result.js'
import { LoginResponse } from '../DTOs/login_response.js'

export default class LoginService {
  async authenticate(email: string, senha: string): Promise<Result<LoginResponse>> {
    const user = await User.query().where('email', email).where('ativo', true).first()

    if (!user) {
      return Result.falhaUnica('E-mail não cadastrado ou usuário inativo', 401)
    }

    const isPasswordValid = await hash.verify(user.senha, senha)

    if (!isPasswordValid) {
      return Result.falhaUnica('Credenciais inválidas', 401)
    }

    const token = this.generateToken(user)

    return Result.sucesso({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
      },
      token,
    })
  }

  private generateToken(user: User): string {
    const payload = {
      userId: user.id,
      email: user.email,
      nome: user.nome,
    }

    const secret = env.get('APP_KEY')
    const token = jwt.sign(payload, secret, {
      expiresIn: '1d',
      issuer: 'webcomissao',
      audience: 'webcomissao-api',
    })

    return token
  }

  async verifyToken(token: string) {
    try {
      const secret = env.get('APP_KEY')
      const decoded = jwt.verify(token, secret) as {
        userId: number
        email: string
        nome: string
      }

      return decoded
    } catch (error) {
      throw new Error('Token inválido ou expirado')
    }
  }
}
