// Schemas de autenticação para documentação Swagger
// Os DTOs são definidos diretamente nos controllers usando JSDoc inline

export const AuthSchemas = {
  LoginRequest: {
    email: 'string',
    senha: 'string',
  },
  LoginResponse: {
    message: 'string',
    data: {
      user: {
        id: 'number',
        nome: 'string',
        email: 'string',
      },
      token: 'string',
    },
  },
  ErrorResponse: {
    message: 'string',
  },
}
