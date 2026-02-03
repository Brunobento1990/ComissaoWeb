export interface LoginResponse {
  user: {
    id: number
    nome: string
    email: string
  }
  token: string
}
