import { useApi } from "../hooks/UseApi";
import { IVendedor } from "../types/Vendedor";

export function useVendedorApi() {
  const apiCreate = useApi({
    method: "POST",
    url: "/vendedores/create",
  });

  const apiUpdate = useApi({
    method: "PUT",
    url: "/vendedores/update",
  });

  const apiObterPorId = useApi({
    method: "GET",
    url: "/vendedores/obter-por-id",
  });

  async function criar(
    body: Partial<IVendedor>,
  ): Promise<IVendedor | undefined> {
    return await apiCreate.action({ body });
  }

  async function atualizar(
    body: Partial<IVendedor>,
  ): Promise<IVendedor | undefined> {
    return await apiUpdate.action({ body });
  }

  async function obterPorId(id: string): Promise<IVendedor | undefined> {
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
