import Vendedor from '#models/vendedor'
import ComissaoVendedor from '#models/comissao_vendedor'
import { PaginacaoRequest, PaginacaoResponse } from '../DTOs/paginacao.js'
import { CreateVendedorDTO, UpdateVendedorDTO } from '../DTOs/vendedor.js'
import Result from '../utils/result.js'
import { VendedorViewModel } from '../view_models/vendedor_view_model.js'

export default class VendedorService {
  async paginacao(params: PaginacaoRequest): Promise<PaginacaoResponse<VendedorViewModel>> {
    const query = Vendedor.query()

    if (params.search) {
      query.where('nome', 'ilike', `%${params.search}%`)
    }

    const count = await query.clone().count('* as total')
    const total = Number(count[0].$extras.total)

    query.orderBy(params.orderBy ?? 'id', params.asc ? 'asc' : 'desc')
    query.preload('comissao')

    const page = Math.max(1, params.skip)
    const resultado = await query.paginate(page, params.take)

    const totalDePaginas = Math.ceil(total / params.take)

    return {
      values: resultado.all().map((vendedor) => new VendedorViewModel(vendedor)),
      totalDePaginas,
    }
  }

  async obterPorId(id: number): Promise<Result<VendedorViewModel>> {
    if (!id || id <= 0 || Number.isNaN(id)) {
      return Result.falhaUnica('ID do vendedor é obrigatório', 400)
    }

    const vendedor = await Vendedor.query().where('id', id).preload('comissao').first()
    if (!vendedor) {
      return Result.falhaUnica('Vendedor não encontrado', 404)
    }

    return Result.sucesso(new VendedorViewModel(vendedor))
  }

  async inativar(id: number): Promise<Result<boolean>> {
    if (!id || id <= 0 || Number.isNaN(id)) {
      return Result.falhaUnica('ID do vendedor é obrigatório', 400)
    }

    const vendedor = await Vendedor.find(id)
    if (!vendedor) {
      return Result.falhaUnica('Vendedor não encontrado', 404)
    }

    vendedor.merge({ ativo: false })
    await vendedor.save()

    return Result.sucesso(true)
  }

  async create(data: CreateVendedorDTO): Promise<Result<VendedorViewModel>> {
    const vendedor = await Vendedor.create({
      nome: data.nome,
      ativo: data.ativo ?? true,
    })

    await ComissaoVendedor.create({
      vendedorId: vendedor.id,
      valorFixo: data.comissao.valorFixo,
      percentualPorVenda: data.comissao.percentualPorVenda,
    })

    await vendedor.refresh()
    await vendedor.load('comissao')

    return Result.sucesso(new VendedorViewModel(vendedor))
  }

  async update(data: UpdateVendedorDTO): Promise<Result<VendedorViewModel>> {
    const vendedor = await Vendedor.query().where('id', data.id).preload('comissao').first()
    if (!vendedor) {
      return Result.falhaUnica('Vendedor não encontrado', 404)
    }

    if (data.nome !== undefined || data.ativo !== undefined) {
      vendedor.merge({
        ...(data.nome !== undefined && { nome: data.nome }),
        ...(data.ativo !== undefined && { ativo: data.ativo }),
      })
      await vendedor.save()
    }

    if (data.comissao) {
      if (vendedor.comissao) {
        vendedor.comissao.merge({
          valorFixo: data.comissao.valorFixo,
          percentualPorVenda: data.comissao.percentualPorVenda,
        })
        await vendedor.comissao.save()
      } else {
        await ComissaoVendedor.create({
          vendedorId: vendedor.id,
          valorFixo: data.comissao.valorFixo,
          percentualPorVenda: data.comissao.percentualPorVenda,
        })
        await vendedor.load('comissao')
      }
    }

    await vendedor.refresh()
    await vendedor.load('comissao')

    return Result.sucesso(new VendedorViewModel(vendedor))
  }
}
