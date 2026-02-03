export interface IUsuario {
  id: number;
  nome: string;
  email: string;
}

export interface IUsuarioCreate {
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
}

export interface IUSuarioUpdate extends IUsuarioCreate {
  id: number;
}
