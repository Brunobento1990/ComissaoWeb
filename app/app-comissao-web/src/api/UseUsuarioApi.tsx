import { useApi } from "../hooks/UseApi";
import { IUsuario, IUsuarioCreate, IUSuarioUpdate } from "../types/Usuario";

export function useUsuarioApi() {
  const apiCreate = useApi({
    method: "POST",
    url: "/users/create",
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: "/users/update",
  });

  const apiObterPorId = useApi({
    method: "GET",
    url: "/users/obter-por-id",
  });

  async function criar(body: IUsuarioCreate): Promise<IUsuario | undefined> {
    return await apiCreate.action({ body });
  }

  async function atualizar(
    body: IUSuarioUpdate,
  ): Promise<IUsuario | undefined> {
    return await apiUpdate.action({ body });
  }

  async function obterPorId(id: string): Promise<IUsuario | undefined> {
    return await apiObterPorId.action({ urlParams: `?id=${id || ""}` });
  }

  return {
    criar: {
      fetch: criar,
      loading: apiCreate.statusRequisicao === "loading",
    },
    atualizar: {
      fetch: atualizar,
      loading: apiUpdate.statusRequisicao === "loading",
    },
    obterPorId: {
      fetch: obterPorId,
      loading: apiObterPorId.statusRequisicao === "loading",
    },
  };
}
