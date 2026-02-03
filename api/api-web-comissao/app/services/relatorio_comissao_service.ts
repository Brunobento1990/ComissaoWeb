import Venda from '#models/venda'
import { RelatorioComissaoRequestDTO } from '../DTOs/relatorio_comissao.js'
import Result from '../utils/result.js'
import {
  RelatorioComissaoViewModel,
  ComissaoVendaDetalhe,
} from '../view_models/relatorio_comissao_view_model.js'
import { DateTime } from 'luxon'
import { VendedorViewModel } from '../view_models/vendedor_view_model.js'

export default class RelatorioComissaoService {
  async gerarRelatorio(
    params: RelatorioComissaoRequestDTO
  ): Promise<Result<RelatorioComissaoViewModel>> {
    if (!params.vendedorId || params.vendedorId <= 0) {
      return Result.falhaUnica('ID do vendedor é obrigatório', 400)
    }

    if (!params.dataInicio || !params.dataFim) {
      return Result.falhaUnica('Período de datas é obrigatório', 400)
    }

    const dataInicio = DateTime.fromISO(params.dataInicio).startOf('day')
    const dataFim = DateTime.fromISO(params.dataFim).endOf('day')

    if (!dataInicio.isValid || !dataFim.isValid) {
      return Result.falhaUnica('Datas inválidas', 400)
    }

    if (dataInicio > dataFim) {
      return Result.falhaUnica('Data inicial deve ser menor que data final', 400)
    }

    const vendas = await Venda.query()
      .where('vendedor_id', params.vendedorId)
      .whereBetween('created_at', [dataInicio.toSQL(), dataFim.toSQL()])
      .preload('vendedor')
      .orderBy('created_at', 'desc')

    if (vendas.length === 0) {
      return Result.falhaUnica('Nenhuma venda encontrada para o período informado', 404)
    }

    const vendasDetalhadas: ComissaoVendaDetalhe[] = vendas.map((venda) => {
      return {
        vendaId: venda.id,
        valor: venda.valor,
        valorComissao: venda.valorComissao,
        dataVenda: venda.createdAt,
      }
    })

    const resultado = new RelatorioComissaoViewModel({
      totalVendas: vendasDetalhadas.length,
      valorTotalComissao: vendasDetalhadas.reduce((acc, venda) => acc + venda.valorComissao, 0),
      valorTotalVendas: vendasDetalhadas.reduce((acc, venda) => acc + venda.valor, 0),
      vendedor: new VendedorViewModel(vendas[0].vendedor),
      vendas: vendasDetalhadas,
    })

    return Result.sucesso(resultado)
  }
}
