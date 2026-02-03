import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import VendedorService from '#services/vendedor_service'
import BaseController from './base_controller.js'
import { vendedorValidator, vendedorUpdateValidator } from '#validators/vendedor_validator'

export default class VendedoresController {
  /**
   * @summary Listar vendedores com paginação
   * @tag VENDEDORES
   * @security bearerAuth
   * @paramQuery skip - Número da página - @default(1)
   * @paramQuery take - Itens por página - @default(10)
   * @paramQuery search - Buscar por nome
   * @paramQuery orderBy - Campo para ordenar - @enum(nome, createdAt)
   * @paramQuery order - Direção da ordenação - @enum(asc, desc)
   * @responseBody 200 - {"values": [], "quantidadeDePaginas": number}
   */
  @inject()
  async index({ request, response }: HttpContext, vendedorService: VendedorService) {
    const params = request.qs()

    const resultado = await vendedorService.paginacao({
      take: params.take ? Number(params.take) : 10,
      skip: params.skip ? Number(params.skip) : 0,
      search: params.search,
      orderBy: params.orderBy,
      asc: params.order === 'asc',
    })

    return response.ok(resultado)
  }

  /**
   * @summary Obter vendedor por ID
   * @tag VENDEDORES
   * @security bearerAuth
   * @paramQuery id - ID do vendedor - @type(integer) - @required
   * @responseBody 200 - {"id": number, "nome": string, "ativo": boolean, "comissao": {"id": number, "valorFixo": number, "percentualPorVenda": number}, "createdAt": string, "updatedAt": string}
   * @responseBody 404 - {"message": "Vendedor não encontrado"}
   */
  @inject()
  async obterPorId({ request, response }: HttpContext, vendedorService: VendedorService) {
    const params = request.qs()
    const resultado = await vendedorService.obterPorId(Number(params.id))

    return BaseController.resultado(resultado, { response } as any)
  }

  /**
   * @summary Inativar vendedor
   * @tag VENDEDORES
   * @security bearerAuth
   * @paramQuery id - ID do vendedor - @type(integer) - @required
   * @responseBody 200
   * @responseBody 404 - {"message": "Vendedor não encontrado"}
   */
  @inject()
  async inativar({ request, response }: HttpContext, vendedorService: VendedorService) {
    const params = request.qs()
    const resultado = await vendedorService.inativar(Number(params.id))

    return BaseController.resultado(resultado, { response } as any)
  }

  /**
   * @summary Criar vendedor
   * @description Realiza a criação de um novo vendedor com nome e comissão
   * @tag VENDEDORES
   * @security bearerAuth
   * @requestBody {"nome": "string *required *minLength:3", "ativo": "boolean", "comissao": {"valorFixo": "number *required *min:0", "percentualPorVenda": "number *required *min:0 *max:100"}}
   * @responseBody 200 - {"message": "string", "data": {"id": "number", "nome": "string", "ativo": "boolean", "comissao": {"id": "number", "valorFixo": "number", "percentualPorVenda": "number"}}}
   * @responseBody 400 - {"message": "string"} - Erro na criação do vendedor
   * @responseBody 422 - {"message": "string", "errors": []} - Erro de validação
   */
  @inject()
  async create({ request, response }: HttpContext, vendedorService: VendedorService) {
    const payload = await request.validateUsing(vendedorValidator)

    const resultado = await vendedorService.create(payload)

    return BaseController.resultado(resultado, { response } as any)
  }

  /**
   * @summary Atualizar vendedor
   * @description Realiza a atualização de um vendedor existente com nome e comissão
   * @tag VENDEDORES
   * @security bearerAuth
   * @requestBody {"id": "number *required", "nome": "string *minLength:3", "ativo": "boolean", "comissao": {"valorFixo": "number *min:0", "percentualPorVenda": "number *min:0 *max:100"}}
   * @responseBody 200 - {"message": "string", "data": {"id": "number", "nome": "string", "ativo": "boolean", "comissao": {"id": "number", "valorFixo": "number", "percentualPorVenda": "number"}}}
   * @responseBody 400 - {"message": "string"} - Erro na atualização do vendedor
   * @responseBody 404 - {"message": "Vendedor não encontrado"}
   * @responseBody 422 - {"message": "string", "errors": []} - Erro de validação
   */
  @inject()
  async update({ request, response }: HttpContext, vendedorService: VendedorService) {
    const payload = await request.validateUsing(vendedorUpdateValidator)

    const resultado = await vendedorService.update(payload)

    return BaseController.resultado(resultado, { response } as any)
  }
}
