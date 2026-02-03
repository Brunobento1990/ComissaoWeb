import { useApi } from "../hooks/UseApi";
import { ILoginRequest, ILoginResponse } from "../types/Login";

export function useLoginApi() {
  const api = useApi({
    method: "POST",
    url: "auth/login",
    naoRenderizarResposta: true,
  });

  async function login(
    body: ILoginRequest,
  ): Promise<ILoginResponse | undefined> {
    return await api.action<ILoginResponse>({ body });
  }

  return {
    login: {
      fetch: login,
      loading: api.statusRequisicao === "loading",
    },
  };
}
