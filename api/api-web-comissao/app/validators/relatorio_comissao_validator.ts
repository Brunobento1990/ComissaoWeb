import vine from '@vinejs/vine'

export const relatorioComissaoValidator = vine.compile(
  vine.object({
    vendedorId: vine.number().positive(),
    dataInicio: vine.string(),
    dataFim: vine.string(),
  })
)
