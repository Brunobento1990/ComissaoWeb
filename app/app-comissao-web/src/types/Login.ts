import { IUsuario } from "./Usuario";

export interface ILoginRequest {
  email: string;
  senha: string;
}

export interface ILoginResponse {
  user: IUsuario;
  token: string;
}
