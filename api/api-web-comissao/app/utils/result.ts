export default class Result<T> {
  private readonly _valor?: T
  private readonly _erros?: string[]
  private readonly _statusCode?: number

  private constructor(valor?: T, erros?: string[] | undefined, statusCode?: number) {
    this._valor = valor
    this._erros = erros
    this._statusCode = statusCode
  }

  get statusCode(): number | undefined {
    return this._statusCode
  }

  static sucesso<T>(valor: T): Result<T> {
    return new Result<T>(valor, [])
  }

  static falha<T>(erros: string[], statusCode?: number): Result<T> {
    return new Result<T>(undefined, erros, statusCode)
  }

  static falhaUnica<T>(erro: string, statusCode?: number): Result<T> {
    return new Result<T>(undefined, [erro], statusCode)
  }

  get valor(): T | undefined {
    return this._valor
  }

  erros = () => this._erros || []

  sucesso(): boolean {
    return !this._erros || this._erros.length === 0
  }
}
