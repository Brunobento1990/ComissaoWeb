export interface ComissaoVendedorDTO {
  valorFixo: number
  percentualPorVenda: number
}

export interface CreateVendedorDTO {
  nome: string
  ativo?: boolean
  comissao: ComissaoVendedorDTO
}

export interface UpdateVendedorDTO {
  id: number
  nome?: string
  ativo?: boolean
  comissao?: ComissaoVendedorDTO
}
