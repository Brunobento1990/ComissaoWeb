import vine from '@vinejs/vine'

export const userValidator = vine.compile(
  vine.object({
    email: vine.string().email().maxLength(255).trim(),
    senha: vine.string().trim(),
    nome: vine.string().maxLength(255).trim(),
  })
)

export const userUpdateValidator = vine.compile(
  vine.object({
    id: vine.number().positive(),
    email: vine.string().email().maxLength(255).trim(),
    senha: vine.string().trim(),
    nome: vine.string().maxLength(255).trim(),
  })
)
