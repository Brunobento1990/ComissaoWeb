import app from '@adonisjs/core/services/app'

export default {
  path: app.makePath(),
  title: 'API Web Comissão',
  version: '1.0.0',
  description: 'API para gestão de comissões',
  tagIndex: 1,
  info: {
    title: 'API Web Comissão',
    version: '1.0.0',
    description: 'Documentação da API Web Comissão',
  },
  snakeCase: true,
  debug: false,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  authMiddlewares: ['auth', 'auth:api'],
  defaultSecurityScheme: 'bearerAuth',
  persistAuthorization: true,
  showFullPath: false,
}
