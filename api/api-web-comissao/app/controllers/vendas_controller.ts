import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import VendaService from '#services/venda_service'
import BaseController from './base_controller.js'
import { vendaValidator } from '#validators/venda_validator'

export default class VendasController {
  /**
   * @summary Listar vendas com paginação
   * @tag VENDAS
   * @security bearerAuth
   * @paramQuery skip - Número da página - @default(1)
   * @paramQuery take - Itens por página - @default(10)
   * @paramQuery orderBy - Campo para ordenar - @enum(id, createdAt)
   * @paramQuery order - Direção da ordenação - @enum(asc, desc)
   * @responseBody 200 - {"values": [], "quantidadeDePaginas": number}
   */
  @inject()
  async index({ request, response }: HttpContext, vendaService: VendaService) {
    const params = request.qs()

    const resultado = await vendaService.paginacao({
      take: params.take ? Number(params.take) : 10,
      skip: params.skip ? Number(params.skip) : 0,
      search: params.search,
      orderBy: params.orderBy,
      asc: params.order === 'asc',
    })

    return response.ok(resultado)
  }

  /**
   * @summary Obter venda por ID
   * @tag VENDAS
   * @security bearerAuth
   * @paramQuery id - ID da venda - @type(integer) - @required
   * @responseBody 200 - {"id": number, "vendedorId": number, "valor": number, "valorComissao": number, "vendedor": {}, "createdAt": string, "updatedAt": string}
   * @responseBody 404 - {"message": "Venda não encontrada"}
   */
  @inject()
  async obterPorId({ request, response }: HttpContext, vendaService: VendaService) {
    const params = request.qs()
    const resultado = await vendaService.obterPorId(Number(params.id))

    return BaseController.resultado(resultado, { response } as any)
  }

  /**
   * @summary Criar venda
   * @description Realiza a criação de uma nova venda
   * @tag VENDAS
   * @security bearerAuth
   * @requestBody {"vendedorId": "number *required", "valor": "number *required *min:0"}
   * @responseBody 200 - {"message": "string", "data": {"id": "number", "vendedorId": "number", "valor": "number", "valorComissao": "number"}}
   * @responseBody 400 - {"message": "string"} - Erro na criação da venda
   * @responseBody 422 - {"message": "string", "errors": []} - Erro de validação
   */
  @inject()
  async create({ request, response }: HttpContext, vendaService: VendaService) {
    const payload = await request.validateUsing(vendaValidator)

    const resultado = await vendaService.create(payload)

    return BaseController.resultado(resultado, { response } as any)
  }
}
