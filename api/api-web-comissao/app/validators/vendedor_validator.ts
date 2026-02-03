import vine from '@vinejs/vine'

export const vendedorValidator = vine.compile(
  vine.object({
    nome: vine.string().minLength(3).maxLength(255).trim(),
    ativo: vine.boolean().optional(),
    comissao: vine.object({
      valorFixo: vine.number().min(0),
      percentualPorVenda: vine.number().min(0).max(100),
    }),
  })
)

export const vendedorUpdateValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
    nome: vine.string().minLength(3).maxLength(255).trim().optional(),
    ativo: vine.boolean().optional(),
    comissao: vine
      .object({
        valorFixo: vine.number().min(0),
        percentualPorVenda: vine.number().min(0).max(100),
      })
      .optional(),
  })
)
