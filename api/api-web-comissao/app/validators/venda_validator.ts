import vine from '@vinejs/vine'

export const vendaValidator = vine.compile(
  vine.object({
    vendedorId: vine.number().positive(),
    valor: vine.number().min(0),
  })
)
