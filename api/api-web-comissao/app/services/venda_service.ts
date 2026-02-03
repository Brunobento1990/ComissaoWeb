import Venda from '#models/venda'
import Vendedor from '#models/vendedor'
import { PaginacaoRequest, PaginacaoResponse } from '../DTOs/paginacao.js'
import { CreateVendaDTO } from '../DTOs/venda.js'
import Result from '../utils/result.js'
import { VendaViewModel } from '../view_models/venda_view_model.js'

export default class VendaService {
  async paginacao(params: PaginacaoRequest): Promise<PaginacaoResponse<VendaViewModel>> {
    const query = Venda.query()

    const count = await query.clone().count('* as total')
    const total = Number(count[0].$extras.total)

    query.orderBy(params.orderBy ?? 'id', params.asc ? 'asc' : 'desc')
    query.preload('vendedor')

    const page = Math.max(1, params.skip)
    const resultado = await query.paginate(page, params.take)

    const totalDePaginas = Math.ceil(total / params.take)

    return {
      values: resultado.all().map((venda) => new VendaViewModel(venda)),
      totalDePaginas,
    }
  }

  async obterPorId(id: number): Promise<Result<VendaViewModel>> {
    if (!id || id <= 0 || Number.isNaN(id)) {
      return Result.falhaUnica('ID da venda é obrigatório', 400)
    }

    const venda = await Venda.query().where('id', id).preload('vendedor').first()
    if (!venda) {
      return Result.falhaUnica('Venda não encontrada', 404)
    }

    return Result.sucesso(new VendaViewModel(venda))
  }

  async create(data: CreateVendaDTO): Promise<Result<VendaViewModel>> {
    if (!data?.valor) {
      return Result.falhaUnica('Valor da venda é obrigatório', 400)
    }

    const vendedor = await Vendedor.query().where('id', data.vendedorId).preload('comissao').first()

    if (!vendedor) {
      return Result.falhaUnica('Vendedor não encontrado', 404)
    }

    if (!vendedor.comissao) {
      return Result.falhaUnica('Vendedor não possui comissão cadastrada', 400)
    }

    const venda = await Venda.create({
      vendedorId: data.vendedorId,
      valor: data.valor,
      valorComissao: vendedor.calcularComissao(data.valor),
    })

    return Result.sucesso(new VendaViewModel(venda))
  }
}
