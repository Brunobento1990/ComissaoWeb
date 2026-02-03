import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import RelatorioComissaoService from '#services/relatorio_comissao_service'
import BaseController from './base_controller.js'
import { relatorioComissaoValidator } from '#validators/relatorio_comissao_validator'

export default class RelatorioComissaoController {
  /**
   * @summary Gerar relatório de comissão
   * @description Gera relatório de comissão de um vendedor em um período específico
   * @tag RELATÓRIOS
   * @security bearerAuth
   * @paramQuery vendedorId - ID do vendedor - @type(integer) - @required
   * @paramQuery dataInicio - Data inicial (YYYY-MM-DD) - @required
   * @paramQuery dataFim - Data final (YYYY-MM-DD) - @required
   * @responseBody 200 - {"vendedorId": number, "vendedorNome": string, "periodoInicio": string, "periodoFim": string, "totalVendas": number, "valorTotalVendas": number, "comissaoTotal": number, "vendas": []}
   * @responseBody 400 - {"message": "string"} - Dados inválidos
   * @responseBody 404 - {"message": "Vendedor não encontrado"}
   */
  @inject()
  async gerar(
    { request, response }: HttpContext,
    relatorioComissaoService: RelatorioComissaoService
  ) {
    const params = request.qs()
    const payload = await relatorioComissaoValidator.validate({
      vendedorId: Number(params.vendedorId),
      dataInicio: params.dataInicio,
      dataFim: params.dataFim,
    })

    const resultado = await relatorioComissaoService.gerarRelatorio(payload)

    return BaseController.resultado(resultado, { response } as any)
  }
}
