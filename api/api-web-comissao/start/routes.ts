/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import swagger from '#config/swagger'
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')
const UsersController = () => import('#controllers/users_controller')
const VendedoresController = () => import('#controllers/vendedores_controller')
const VendasController = () => import('#controllers/vendas_controller')
const RelatorioComissaoController = () => import('#controllers/relatorio_comissao_controller')

router.get('/', async () => {
  return 'api web comissao is running'
})

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

router.post('/auth/login', [AuthController, 'login'])

router.get('/auth/me', [AuthController, 'me']).use(middleware.auth())

router
  .group(() => {
    router.get('/paginacao', [UsersController, 'index'])
    router.get('/obter-por-id', [UsersController, 'obterPorId'])
    router.post('/create', [UsersController, 'create'])
    router.put('/update', [UsersController, 'update'])
    router.delete('/inativar', [UsersController, 'inativar'])
  })
  .prefix('/users')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/paginacao', [VendasController, 'index'])
    router.get('/obter-por-id', [VendasController, 'obterPorId'])
    router.post('/create', [VendasController, 'create'])
    router.get('/relatorio', [RelatorioComissaoController, 'gerar'])
  })
  .prefix('/vendas')
  .use(middleware.auth())

router
  .group(() => {
    router.get('/paginacao', [VendedoresController, 'index'])
    router.get('/obter-por-id', [VendedoresController, 'obterPorId'])
    router.post('/create', [VendedoresController, 'create'])
    router.put('/update', [VendedoresController, 'update'])
    router.delete('/inativar', [VendedoresController, 'inativar'])
  })
  .prefix('/vendedores')
  .use(middleware.auth())
